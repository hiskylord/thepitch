const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema({
  order: { type: Array, required: true },
  buyeremail: { type: String, required: true },
  selleremail: { type: String, required: true },
  buyername: { type: String, required: true },
  sellername: { type: String, required: true },
  tid: { type: String, required: true },
  status: { type: String, default: "PENDING", required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.Orders || mongoose.model("Orders", ordersSchema);
