const mongoose = require("mongoose");
const cryptoAddrsSchema = new mongoose.Schema({
  addrs: { type: String, required: true },
  type: { type: String, required: true },
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
  mongoose.models.Cryptoaddrs ||
  mongoose.model("Cryptoaddrs", cryptoAddrsSchema);
