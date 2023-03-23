import { db, mongoose } from '/components/db'
const items = require('/schemas/Items.js')
let msg
const data = {}
const Sendcarts = async (req, res) => {
  const cart = []
  const { action } = req.query
  req.body.cart.forEach((c) => {
    cart.push(mongoose.Types.ObjectId(c))
  })
  switch (action) {
    case 'fetch':
      data.cartitems = await items.find({
        _id: {
          $in: cart,
        },
      })
      break
    default:
      break
  }
  return res.status(200).json({ msg: '', data })
}
export default Sendcarts
