const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, default: true, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.Subscriber || mongoose.model("Subscriber", couponsSchema);
