const ClientSessions = require("../../../model/clientSessionModel");
const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");

const Logout = AsyncErrorHandler(async (req, res, next) => {
    try {

        const { cookieID, userId } = req.decoded;
        // console.log("Inside logout: ", cookieID, userId);
        // Find and delete the active session
        const session = await ClientSessions.findOne({ userId, cookieID });
        if (session) {
            await ClientSessions.deleteOne({ _id: session._id });
        }

        // Clear the cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout",
            error: error.message,
        });
    }
});

module.exports = Logout;
