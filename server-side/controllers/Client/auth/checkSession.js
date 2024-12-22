const ClientSession = require("../../../model/clientSessionModel")
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const jwt = require("jsonwebtoken")
const User = require("../../../model/userModel")

const checkSession = AsyncErrorHandler(async (req, res, next) => {
    // Extract token from user's cookie
    const token = req.decoded;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    try {
        //Verify the JWT token
        const decoded = jwt.verify(token, process.env.COOKIE_SECRET_KEY);
        const userId = decoded.userId;
        const storedToken = await ClientSession.findOne({ userId });

        if (!storedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const user = await User.findById(userId);
        const sanitizedUser = {
            userID: user._id,
            email: user.email,
            username: user.username,
            emailVerified: user.emailVerified,
            cfVerified: user.cfVerified,
            cfID: user.cfID
        }
        //Success response
        res.status(200).json({
            data: sanitizedUser,
            success: true,
            message: "Session verified"
        });

    } catch (error) {
        next(error);
    }
})

module.exports = checkSession;