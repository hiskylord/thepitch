const mongoose = require("mongoose");
const visitsSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
  referrer: { type: String, required: true },
  pageVisit: { type: String, required: true },
  visitAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  exitAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.Visits || mongoose.model("Visits", visitsSchema);
