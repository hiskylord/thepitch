import { db, mongoose } from '/components/db'
const items = require('/schemas/Items.js')
let msg='';let email;
const data={};
const ProcessItems = async (req, res) => {
  const {action}=req.query
switch(action) {
  case 'all':
    data.all=await items.find()
    break;
  case 'promotions':
    data.promotions=await items.find({promoted:true})
    break;
  default:
        data.all = await items.find()
        break;
      }
  return res.status(200).json({msg, data })
}
export default ProcessItems
     