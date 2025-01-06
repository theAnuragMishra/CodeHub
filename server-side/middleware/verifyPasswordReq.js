const jwt = require("jsonwebtoken")
/**
 * 
 * Middleware to process the password change token
 */
const verifyPasswordReq = (req, res, next) => {
    const token = req.cookies.PASSWORD;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Password change token not found. Please try again.",
        });
    }

    jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired password change token.",
            });
        }
        else if(decoded.purpose == "Verify User"){
            req.body.email = decoded.email;
            next();
        }
        else if(decoded.purpose == "Password Change"){
            req.body.passwordChangeToken = decoded;
            next();
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid password change token. Please try again.",
            });
        
        }
    });
};

module.exports = verifyPasswordReq;