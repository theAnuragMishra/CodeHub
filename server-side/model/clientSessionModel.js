const mongoose = require("mongoose");

const clientSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cookieID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("ClientSessions", clientSessionSchema);