const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const users = require('/schemas/Users.js')
const bcrypt = require('bcrypt')
const register = async (req, res) => {
  try {
    const uimgs = []
    const name = req.body.name
    const email = req.body.email
    const country = req.body.country
    const phone = req.body.phone
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    const pwd = req.body.password
    const pwd2 = req.body.cpassword
    const regdate = new Date().toDateString()
    const lastlog = new Date().toUTCString()
    var msg
    if (pwd2 !== pwd) msg = 'Passwords do not Match'
    const salt = bcrypt.genSaltSync(10)
    const pwdhash = bcrypt.hashSync(pwd, salt)
    if (!(await users.findOne({ email: email }))) {
      const user = await users.create({
        name: name,
        email: email,
        country: country,
        phone: phone,
        ip: ip,
        pwd: pwdhash,
      })
      if (user && user.email) msg = 'Account Created Successfully'
    } else {
      msg = 'User already exist please login'
    }
  } catch (e) {
    msg = e.message
  }
  res.status(200).json({ msg: msg })
}
export default register
