import { db, mongoose } from "/components/db";
import { serialize } from "cookie";
import nextConnect from "next-connect";
import multer from "multer";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
const users = require("/schemas/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export const config = {
  api: {
    bodyParser: false,
  },
};
const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});
apiRoute.use(multer().any());

const logout = apiRoute.post(async (req, res) => {
  try {
    const serialized = serialize("jwtkey", "", {
      req,
      res,
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 14, // 14 Day Age,
      path: "/",
      sameSite: "strict",
    });
    res.setHeader("Set-Cookie", serialized);
  } catch (e) {
    msg = e.message;
  }
  res.status(200).json({ msg: "LOGOUT" });
});
export default logout;
