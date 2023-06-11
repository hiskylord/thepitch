const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  tid: { type: ObjectId, required: true },
  msg: { type: Array, required: true },
  selleremail: { type: String, required: true },
  buyeremail: { type: String, required: true },
  status: { type: String, required: true },
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

module.exports = mongoose.models.Chats || mongoose.model("Chats", chatSchema);
