const jwt = require("jsonwebtoken")

const verifyCookie = (req, res, next) => {
      const token = req.cookies.jwt;
  
      if (!token) {
          return res.status(401).json({
              success: false,
              message: "Authentication cookie not found. Please log in.",
          });
      }
  
      jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
          if (err) {
              return res.status(403).json({
                  success: false,
                  message: "Invalid or expired authentication cookie.",
              });
          }
          req.decoded = decoded;
          next();
      });
  };
  
  module.exports = verifyCookie;
  