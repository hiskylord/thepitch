const mongoose = require("mongoose");
const couponsSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: Boolean, default: true, required: true },
  msg: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  expiresAt: {
    type: Date,
    default: () => Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: () => Date.now(),
  },
  updateBy: { type: String, required: true },
});

module.exports =
  mongoose.models.Coupons || mongoose.model("Coupons", couponsSchema);
