const mongoose = require("mongoose");
const notifySchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: Boolean, default: true, required: true },
  msg: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: () => Date.now(),
  },
  updateBy: { type: String, required: true },
});

module.exports =
  mongoose.models.Notify || mongoose.model("Notify", notifySchema);
