import { db, mongoose } from '/components/db'
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
const items = require('/schemas/Items.js')
const reviews = require('/schemas/Reviews.js')
const fs = require('fs');
let msg='';let email;
const data={};
const ProcessItems = async (req, res) => {
const {action,id} = req.query
  const { cookies } = req
  jwt.verify(cookies.jwtkey, process.env.JSECRET, function (
          err,
          decoded,
        ) {
          if (err) return res.status(403)
          email = decoded.email
        })
  let usrdata=(await users.findOne({ email: email }));
  switch(action) {
    case 'get':
      data.item = await items.findById(id)
      data.reviews = await reviews.find({iid:id})
     data.updated=await items.findOneAndUpdate(
          {
            email: email,
            _id:id,
          },
          {
            $inc: {views: 1}
          })
       break;
    case 'addreview':
 try{
        const {name,star,comment}=req.body;
        if (usrdata) {
      const review = await reviews.create({
        name,star:parseInt(star),comment,email,iid:id
      })
      
      if (review && review.email) msg = 'Review was Successful'
    } else {
      msg = 'Please login'
    }
  } catch (e) {
    msg = e.message
  }
      break;
    default:
        data.listed = await items.find({ email: email })
        break;
      }
  return res.status(200).json({msg, data })
}
export default ProcessItems
     