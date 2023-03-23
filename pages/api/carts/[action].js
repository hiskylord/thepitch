import { db, mongoose } from '/components/db'
const items = require('/schemas/Items.js')
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
      console.log(req.body)
      break
    default:
      break
  }
  return res.status(200).json({ msg: '', data })
}
export default Sendcarts
