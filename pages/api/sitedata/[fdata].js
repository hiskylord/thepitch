import { db, mongoose } from '/components/db'
const categories = require('/schemas/Categories.js')
let msg;
const data={};
const Senddata = async (req, res) => {
  const {fdata} = req.query

  switch(fdata) {
    case 'categories':
      data.categories = await categories.find()
      break
    default:
      break
  }
  return res.status(200).json({msg:'', data })
}
export default Senddata