const jwt = require("jsonwebtoken");

const verifyCookie= (req, res, next) => {
      const token= req.cookies.jwt;

      if(!token) {
            return res.status(401).json({status: false, msg: "No cookie provided" });
      }

      jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
            if (err) {
                  return res.status(403).json({status: false, msg: "Invalid or expired cookie"});
            }
            req.decoded= decoded;
            next();
      })
}

module.exports= verifyCookie;