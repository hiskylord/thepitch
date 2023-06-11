const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  iid: { type: String, required: true },
  email: { type: String, required: true,trim: true },
  star: { type: Number, required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  status: { type: String, default:()=> 'PENDING'},
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);
