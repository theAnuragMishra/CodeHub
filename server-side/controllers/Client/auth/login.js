const Users = require("../../../model/userModel");
const ClientSessions = require("../../../model/clientSessionModel");
const Joi = require("joi");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const VerificationToken = require("../../../model/verificationTokenModel");
const utils = require("../../../utils/auth/auth.utils")
const sendEmail = require("../../../utils/auth/sendEmail")

const Login = AsyncErrorHandler(async (req, res, next) => {
    // Input Validation
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            error: error.details[0].message,
        });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        //Check if user email is verified
        if (!user.emailVerified) {
            //Check if verification token exists
            let token = await VerificationToken.findOne({ email: user.email });
            if (!token) {
                //Create a new verification token
                const verificationCode = await utils.generateVerificationCode();
                token = await VerificationToken.create({
                    email: user.email,
                    code: verificationCode
                });
                await token.save();
            }

            //Generate Email
            const subject = "Verification Email";
            const text = utils.createVerificationEmail({ verificationCode: token.code, subject });

            //Send Email
            await sendEmail(user.email, subject, text);

            return res.status(401).json({
                success: false, message: "Email not verified. Verification email sent."
                , isVerifiedEmail: false
            });
        }

        // Handle session
        const cookieID = randomUUID();

        const existingSession = await ClientSessions.findOne({ userId: user._id });
        if (existingSession) {
            await ClientSessions.deleteOne({ userId: user._id });
        }
        await ClientSessions.create({ userId: user._id, cookieID });
        // Generate JWT
        const token = jwt.sign({ cookieID, userId: user._id }, process.env.COOKIE_SECRET_KEY, {
            expiresIn: "1d",
        });

        // Set secure cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(200).json({
            success: true,
            data: { userId: user._id },
        });
    } catch (error) {
        next(error);
    }
});

module.exports = Login;
