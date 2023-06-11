import { db, mongoose } from '/components/db'
import { generateAddrs, getAddressdata } from '/components/bitcoinjs'
import Axios from 'axios'
const items = require('/schemas/Items.js')
const Transactions = require('/schemas/Transactions.js')
const Bitcoinaddrs = require('/schemas/Bitcoinaddrs.js')
function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
const {
  initializePaymentCard,
  verifyPaymentCard,
} = require('/components/paystack')
const Sendcarts = async (req, res) => {
  let msg
  const data = {}
  const { action } = req.query
  switch (action) {
    case 'fetch':
      let cart = []
      req.body.cart.forEach((c) => {
        cart.push(mongoose.Types.ObjectId(c))
      })
      data.cartitems = await items.find({
        _id: {
          $in: cart,
        },
      })
      break
    case 'pay':
      const { method } = req.body
      let cartitems, ref, redirect
      let carts = []
      req.body.cart.split(',').forEach((c) => {
        carts.push(mongoose.Types.ObjectId(c))
      })
      cartitems = await items.find({
        _id: {
          $in: carts,
        },
      })
      let total = cartitems.reduce(
        (a, b) => a + (b.price * (100 - b.discount)) / 100,
        0,
      )
      switch (method) {
        case 'bitcoin':
          const { address, pubkey, prikey } = await generateAddrs()
          const ADDRS = await Bitcoinaddrs.create({
            address: address,
            pubkey: pubkey,
            prikey: prikey,
          })
          ref = address
          redirect = '/processpay'
          break
        case 'card':
          break
        default:
          break
      }
      const TRANS = await Transactions.create({
        orderId: makeid(7),
        ref: ref,
        method: method,
        buyer_name: req.body.name,
        buyer_email: req.body.email,
        country: req.body.country,
        cart: req.body.cart.split(','),
        total: total,
        redirect: redirect,
      })
      console.log(TRANS)
      break
    default:
      break
  }

  return res.status(200).json({ msg: '', data })
}
export default Sendcarts
