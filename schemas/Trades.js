const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  photo: { type: Array, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  buyeremail: {
    type: String,
    require: true,
    lowercase: true,
  },
  selleremail: {
    type: String,
    require: true,
    lowercase: true,
  },
  buyerphone: { type: String, required: true },
  status: { type: String, default: "ACTIVE", required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  completedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.trades || mongoose.model("trades", tradeSchema);
