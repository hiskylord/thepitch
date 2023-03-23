const mongoose = require('mongoose')
const bitcoinSchema = new mongoose.Schema({
  address: { type: String, required: true },
  n_tx: { type: String, required: true },
  total_received: { type: String, required: true },
  total_sent: { type: String, required: true },
  pkey: { type: String, required: true },
  status: { type: String, default: 'PENDING', required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
})

module.exports =
  mongoose.models.Bitcoinaddrs || mongoose.model('Bitcoinaddrs', bitcoinSchema)
