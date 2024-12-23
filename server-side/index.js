const express = require("express");
const clientRoutes = require("./routes/clientRoutes");
// const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./db/connect");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const errorHandler = require("./ErrorHandlers/error_handler");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("📋[server-log]: :method :url :status :response-time ms"));
app.use(cookieParser());

// Allowed origins for CORS
const allowedOrigins = [
    "https://computercodingclub.in",
    "http://localhost:3000",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

// Connect to the database
connectDB();

// Routes
// app.use("/admin", adminRoutes);
app.use("/", clientRoutes);

// Error handler (last middleware)
app.use(errorHandler);

// Start the server
const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down due to uncaught exception");
    server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down due to unhandled promise rejection");
    server.close(() => process.exit(1));
});
