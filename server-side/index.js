const express = require("express");
//const cors = require("cors");
const mongoose = require("mongoose");
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

//app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));



app.use(function (req, res, next) {
    const origin = req.headers.origin;
    console.log("request origin: ", origin);
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_PATH);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // if (req.method === 'OPTIONS') {
    //     return res.status(200).end();  // Respond with 200 OK for preflight
    // }
    next();
});

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/admin", adminRoutes);
app.use(process.env.REACT_APP_BASE_URL + "/", clientRoutes);

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);