const mongoose = require("mongoose");

const VerificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10000,
  },
});

const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);

module.exports = VerificationToken;