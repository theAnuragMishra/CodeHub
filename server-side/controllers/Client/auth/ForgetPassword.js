const Users = require("../../../model/userModel");
const VerificationToken = require("../../../model/verificationTokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const utils = require("../../../utils/auth/auth.utils");
const sendEmail = require("../../../utils/auth/sendEmail");

/**
 * Step 1: Generate and send OTP
 */
const ForgetPassword = AsyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;

    console.log("Received email:", email);

    // Check if the user exists and email is verified
    const user = await Users.findOne({ email });
    if (!user || !user.emailVerified) {
        return res.status(404).json({
            success: false,
            message: "User does not exist or email is not verified",
        });
    }
    if(res.cookies?.PASSWORD){
        res.clearCookie('PASSWORD', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite:process.env.NODE_ENV === "production" ? "none" : "lax" });
    }
    try {
        // Remove any existing OTP token for this email
        const deleteResult = await VerificationToken.deleteOne({ email, subject: "Password Change OTP" });
        console.log("Deleted existing token:", deleteResult);

        // Generate OTP and save it
        const otp = utils.generateVerificationCode();
        const newToken = new VerificationToken({
            email,
            subject: "Password Change OTP",
            code: otp,
        });
        await newToken.save();

        console.log("New token saved:", newToken);

        // Send the OTP to the user's email
        const emailContent = utils.createForgotPasswordEmail({
            resetCode: otp,
            subject: "Password Change OTP",
        });

        sendEmail(email, "Password Change OTP", emailContent);

        // Generate a temporary token for password change
        const passwordChangeToken = jwt.sign(
            { email, purpose: "Verify User" },
            process.env.COOKIE_SECRET_KEY,
            { expiresIn: "15m" } // Token expires in 15 minutes
        );

        // Set the token in a secure cookie
        res.cookie("PASSWORD", passwordChangeToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email for password recovery",
        });
    } catch (error) {
        console.error("Error handling ForgetPassword:", error);

        if (error.code === 11000) {
            // Handle duplicate key error gracefully
            return res.status(500).json({
                success: false,
                message: "Duplicate key error. Try again later.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    }
});

/**
 * Step 2: Verify OTP and generate a confirmation token
 */
const VerifyPasswordChangeOTP = AsyncErrorHandler(async (req, res, next) => {
    const { email, otp } = req.body;

    // Validate OTP
    const token = await VerificationToken.findOne({ email, subject: "Password Change OTP", code: otp });
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP",
        });
    }
    if(token.code!=otp){
        return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP",
        });
    }

    // Generate a temporary token for password change
    const passwordChangeToken = jwt.sign({ email, purpose: "Password Change" }, process.env.COOKIE_SECRET_KEY, {
        expiresIn: "15m", // Token expires in 15 minutes
    });
    res.clearCookie('PASSWORD', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite:process.env.NODE_ENV === "production" ? "none" : "lax" });
    res.cookie("PASSWORD", passwordChangeToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15* 60 * 1000, // 15 minutes
        });
    
    // Delete the OTP token after successful verification
    await VerificationToken.findByIdAndDelete(token._id);

    return res.status(200).json({
        success: true,
        message: "OTP verified. Use the token to reset your password.",
    });
});

/**
 * Step 3: Update password using confirmation token
 */
const ConfirmPasswordChange = AsyncErrorHandler(async (req, res, next) => {
    const { passwordChangeToken, newPassword } = req.body;
    const { email, purpose } =passwordChangeToken;
    console.log(passwordChangeToken)
    console.log(newPassword)
    if (purpose !== "Password Change") {
        return res.status(400).json({
            success: false,
            message: "Invalid token purpose",
        });
    }

    // Find the user
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    res.clearCookie('PASSWORD', { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
});

module.exports = { ForgetPassword, VerifyPasswordChangeOTP, ConfirmPasswordChange };
