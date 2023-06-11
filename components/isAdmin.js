import { db, mongoose } from '/components/db'
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
const isAdmin = async (cookies) => {
  var email, user
  try {
    jwt.verify(cookies.jwtkey, process.env.JSECRET, function (err, decoded) {
      if (err) return res.status(403)
      email = decoded.email
    })
  } catch (e) {
    console.log(e.message)
  }
  user = await users.findOne({ email: email })
  return {isadmin:user.badge>0,name:user.name}
}
export default isAdmin
