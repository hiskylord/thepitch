import { db, mongoose } from "/components/db";
const users = require("/schemas/Users.js");
const jwt = require("jsonwebtoken");
const authenticate = async (req, res) => {
  var email;
  const { cookies } = req;
  try {
    jwt.verify(cookies.jwtkey, process.env.JSECRET, function (err, decoded) {
      if (err) return res.status(403);
      email = decoded.email;
    });
  } catch (e) {
    console.log(e.message);
  }

  res.status(200).json({ auth: email ? true : false });
};
export default authenticate;
