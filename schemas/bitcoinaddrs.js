const mongoose = require('mongoose')
const bitcoinSchema = new mongoose.Schema({
  address: { type: String, required: true },
  n_tx: { type: String, default: 0 },
  total_received: { type: String, required: true, default: 0 },
  total_sent: { type: String, required: true, default: 0 },
  prikey: { type: String, required: true },
  pubkey: { type: String, required: true },
  status: { type: String, default: 'INACTIVE', required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
})

module.exports =
  mongoose.models.Bitcoinaddrs || mongoose.model('Bitcoinaddrs', bitcoinSchema)
