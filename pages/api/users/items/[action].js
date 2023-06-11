import { db, mongoose } from '/components/db'
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
const items = require('/schemas/Items.js')
const fs = require('fs')
var email
let msg = ''
const data = {}
const ProcessItems = async (req, res) => {
  const { action } = req.query
  const { cookies } = req
  jwt.verify(cookies.jwtkey, process.env.JSECRET, function (err, decoded) {
    if (err) return res.status(403)
    email = decoded.email
  })
  let usrdata = await users.findOne({ email: email })
  switch (action) {
    case 'list':
      data.listed = await items.find({ email: email })
      break
    case 'add':
      try {
        const {
          title,
          category,
          subcategory,
          price,
          photos,
          license,
          content,
          guide,
          preview,
          thumbnails,
          keywords
        } = req.body
        if (usrdata) {
          var photosvar = photos[0].split(',')
          var thumbnailsvar = thumbnails[0].split(',')
          const item = await items.create({
            title,
            email,
            category,
            subcategory,
            price,
            photos: photosvar,
            license,
            content,
            guide,
            preview,
            thumbnails: thumbnailsvar,
            tags:keywords,
          })

          if (item && item.email) msg = 'Item Now Pending Approval'
        } else {
          msg = 'Please login'
        }
      } catch (e) {
        msg = e.message
      }
      break
    case 'edit':
      try {
        const {
          title,
          category,
          subcategory,
          price,
          photos,
          license,
          content,
          guide,
          preview,
          discount
        } = req.body
        const updated = await items.findOneAndUpdate(
          {
            email: email,
            _id: req.body.id,
          },
          {
            title,
            category,
            subcategory,
            price,
            photos,
            license,
            content,
            guide,
            preview,
            lastUpdated: Date.now(),
            discount
          },
        )
        msg = 'Item Was Updated Successfully'
      } catch (e) {
        msg = e.message
      }
      break
    case 'delete':
      const deleted = await items.deleteOne(
        { email: email, _id: req.body.id },
        { title },
      )
      msg =
        deleted.deletedCount > 0
          ? 'Successfully Deleted'
          : 'Item does not exist'
      data.listed = await items.find()
      break
    case 'promote':
      try {
        const updated = await items.findOneAndUpdate(
          {
            email: email,
            _id: req.body.id,
          },
          {
            promoted:!req.body.promote
          },
        )
        msg = req.body.promote=='true'?'Promotion Cancelled Successfully':'Promotion Activated Successfully';
        data.listed = await items.find()
      } catch (e) {
        msg = e.message
      }
      break
    default:
      break
  }
  return res.status(200).json({ msg, data })
}
export default ProcessItems
