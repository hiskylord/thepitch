import { db, mongoose } from '/components/db'
const items = require('/schemas/Items.js')
let msg = ''
let email
const data = {}
const ProcessItems = async (req, res) => {
  const { slug, page = 1 } = req.query
  const { search } = req.body
  switch (search) {
    case 'promotions':
      data.promotions = await items.find({ promoted: true })
      break
    default:
      data.all = await items.find({ category: slug })
      break
  }
  return res.status(200).json({ msg, data })
}
export default ProcessItems
