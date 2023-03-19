import { db, mongoose } from '/components/db'
import isAdmin from '/components/isAdmin'
const categories = require('/schemas/Categories.js')
const Categoryaction = async (req, res) => {
  const { cookies } = req
  let msg, category
  const data = {}
  const admin = await isAdmin(cookies)
  const { action } = req.query
  switch (action) {
    case 'add':
      try {
        if (!admin.isadmin) {
          if (!(await categories.findOne({ category: req.body.category }))) {
            const category = await categories.create({
              category: req.body.category.toLowerCase(),
              updateBy: admin.name,
            })
            if (category && category.createdAt) msg = 'Category Added'
          } else {
            msg = 'Category Already Exists'
          }
        } else {
          msg = 'Permission Denied'
        }
      } catch (e) {
        msg = e.message
      }
       data.categories = await categories.find()
      break
    case 'delete':
      try {
        if (!admin.isadmin) {
          if (await categories.deleteOne({ category: req.body.category })) {
          if (category && category.lastUpdated) msg = 'Categories Deleted'
          } else {
            msg = "Category doesn't Exists"
          }
        } else {
          msg = 'Permission Denied'
        }
      } catch (e) {
        msg = e.message
      }
      data.categories = await categories.find()

    case 'list':
      data.categories = await categories.find()

      break
    case 'addsub':
    try {
        if (!admin.isadmin) {
          if (await categories.findOne({ category: req.body.category })) {
            const { subcategories } = await categories.findOne({
              category: req.body.category,
            })
            if (subcategories.includes(req.body.subcategory.toLowerCase())) {
              msg = 'subcategory Already exists'
            } else {
              category = await categories.updateOne(
                { category: req.body.category },
                {
                  subcategories: [
                    ...subcategories,
                    req.body.subcategory.toLowerCase(),
                  ],
                },
              )
            }
            if (category && category.createdAt) msg = 'Subcategory Added'
          } else {
            msg = "Category doesn't Exists"
          }
        } else {
          msg = 'Permission Denied'
        }
      } catch (e) {
        msg = e.message
      }
      data.categories = await categories.find()
         break
    case 'deletesub':
      try {
        if (!admin.isadmin) {
          if (await categories.findOne({ category: req.body.category })) {
            const { subcategories } = await categories.findOne({
              category: req.body.category,
            })
            if (subcategories.includes(req.body.subcategory)) {
              category = await categories.updateOne(
                { category: req.body.category },
                {
                  subcategories: subcategories.filter(function (subcat) {
                    return subcat != req.body.subcategory
                  }),
                },
              )
              msg='Subcategory Deleted'
            } else {
              msg = 'Subcategory does not exist'
            }
            if (category && category.createdAt) msg = 'Subcategories Modified'
          } else {
            msg = "subcategory doesn't Exists"
          }
        } else {
          msg = 'Permission Denied'
        }
      } catch (e) {
        msg = e.message
      }
      data.categories = await categories.find()
break
    case 'editsub':
      try {
        if (!admin.isadmin) {
          if (await categories.findOne({ category: req.body.category })) {
            const { subcategories } = await categories.findOne({
              category: req.body.category,
            })
            if (subcategories.includes(req.body.subcat.toLowerCase())) {
              category = await categories.updateOne(
                { category: req.body.category },
                {
                  subcategories: [...subcategories.filter(function (subcat) {
                    return subcat != req.body.subcat
                  }),req.body.nsubcat.toLowerCase()],
                },
              )
              msg='Subcategory Updated'
            } else {
              msg = 'Subcategory does not exist'
            }
            if (category && category.createdAt) msg = 'Subcategories Modified'
          } else {
            console.log(subcategories)
            msg = "subcategory doesn't Exists"
          }
        } else {
          msg = 'Permission Denied'
        }
      } catch (e) {
        msg = e.message
      }
      data.categories = await categories.find()
    break
    default:
      break
  }
  return res.status(200).json({ msg, data })
}
export default Categoryaction
