const mongoose = require("mongoose");

const catsSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategories: { type: Array, required: true},
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
