import nc from 'next-connect'
import multer from 'multer'
const path = require("path");
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
let msg;
export  const config = {
  api: { bodyParser: false, sizeLimit: '5mb' },
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .gif, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});
let email;
const handler = nc()
  .use(upload.single('profilepic'))
  .patch(async (req, res)=>{
    console.log(req)
   const { jwtkey } = req.cookies
    jwt.verify(jwtkey, process.env.JSECRET, function (
          err,
          decoded,
        ) {
          if (err) return res.status(403)
          email = decoded.email
        })
     const data = await users.updateOne({ email: email }, { photo: req.file.filename })
        if (data.modifiedCount > 0) {
         data.pwd = null
        data.pin = null
        data['_id'] = null
        res.status(200).json({auth: email ? true : false, msg:'Profile Photo Updated',photo:req.file.filename })
        }else{
           res.status(200).json({auth: email ? true : false, msg:'Photo not Updated' })
        }
       
    
  })


export default handler;