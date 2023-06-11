const mongoose = require("mongoose");

const catsSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  tax: { type: Number, required: true },
  socials: { type: Array, required: true },
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
  mongoose.models.Categories || mongoose.model("Categories", catsSchema);
