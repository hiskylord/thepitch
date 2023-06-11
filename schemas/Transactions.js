const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  total: { type: String, required: true },
  cart: { type: Array, required: true },
  buyer_name: { type: String, required: true },
  buyer_email: { type: String, required: true },
  method: { type: String, required: true },
  ref: { type: String, required: true },
  status: { type: String, default: 'PENDING', required: true },
  country: { type: String, required: true },
  redirect:{ type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  }
})

module.exports =
  mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
