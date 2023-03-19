const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: Array, required: true },
  email: { type: String, required: true },
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

module.exports =
  mongoose.models.Tickets || mongoose.model("Tickets", ticketSchema);
