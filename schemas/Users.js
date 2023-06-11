const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  loggedAt: {
    type: Date,
    default: () => Date.now(),
  },
  pwd: { type: String, required: true },
  ip: { type: String, required: true },
  balance: { type: String, default: 0, required: true },
  photo: { type: String, required: false },
  status: { type: String, default: "ACTIVE", required: true },
  badge: { type: Number, default: 0, required: true },
  pin: { type: String, default: "00000", required: true },
});

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
