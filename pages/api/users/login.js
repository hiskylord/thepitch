import { db, mongoose } from "/components/db";
import { serialize } from "cookie";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
const users = require("/schemas/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  switch(req.method){
case 'POST':
var token, user;
  try {
    const email = req.body.email;
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    const pwd = req.body.pwd;
    const lastlog = new Date().toUTCString();
    var msg;
    user = await users.findOne({ email: email });
    if (user && (await bcrypt.compare(pwd, user.pwd))) {
      await users.updateOne({ email: email },{loggedAt:Date.now()});
      token = jwt.sign(
        {
          email: user.email,
          admin: parseInt(user.badge) > 0,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        },
        process.env.JSECRET
      );
      msg = "ACCESS GRANTED";
      const serialized = serialize("jwtkey", token, {
        req,
        res,
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 14, // 14 Day Age,
        path: "/",
        sameSite: "strict",
      });
      res.setHeader("Set-Cookie", serialized);
      setCookie("jwtkey", token, { req, res });
    } else {
      msg = "Invalid Email or Password";
    }
  } catch (e) {
    msg = e.message;
  }
  if (msg !== "ACCESS GRANTED") {
    res.status(200).json({ msg: msg });
  } else {
    res
      .status(200)
      .json({ msg: "ACCESS GRANTED", badge: parseInt(user.badge) });
  }
  }
  
};
export default login;
