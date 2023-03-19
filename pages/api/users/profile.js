import { db, mongoose } from '/components/db'
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export default async function authenticate(req, res) {
  var email
  const { cookies } = req
  switch (req.method) {
    case 'GET':
      try {
        jwt.verify(cookies.jwtkey, process.env.JSECRET, function (
          err,
          decoded,
        ) {
          if (err) return res.status(403)
          email = decoded.email
        })
        const data = await users.findOne({ email: email })
        data.pwd = null
        data.pin = null
        data['_id'] = null
        res.status(200).json({ data, auth: email ? true : false })
      } catch (e) {
        res.status(200).json({ auth: email ? true : false, msg: e.message })
      }
      break
    case 'POST':
      try {
        var email
        let msg = 'Profile not Updated'
        const pwd = req.body.password
        const pwd2 = req.body.cpassword
        if (pwd2 !== pwd) msg = 'Passwords do not Match'
        const salt = bcrypt.genSaltSync(10)
        const pwdhash = bcrypt.hashSync(pwd, salt)
        jwt.verify(cookies.jwtkey, process.env.JSECRET, function (
          err,
          decoded,
        ) {
          if (err) return res.status(403)
          email = decoded.email
          console.log(email)
        })

        const data = await users.updateOne({ email: email }, { pwd: pwdhash })
        if (data.modifiedCount > 0) msg = 'Password Updated'
        data.pwd = null
        data.pin = null
        data['_id'] = null
        res.status(200).json({ data, auth: email ? true : false, msg })
      } catch (e) {
        res.status(200).json({ auth: email ? true : false, msg: e.message })
      }
      break
    default:
      break
  }
}
