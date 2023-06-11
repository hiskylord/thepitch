import nc from 'next-connect'
import multer from 'multer'
const path = require("path");
const users = require('/schemas/Users.js')
const jwt = require('jsonwebtoken')
const sharp = require('sharp');
const tempDir="/public/uploads/items/temp";
export  const config = {
  api: { bodyParser: false, sizeLimit: '5mb' },
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), tempDir));
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
  .use(upload.single('image'))
  .post(async (req, res)=>{
    if(req.file.filename){
      await sharp(req.file.path, { failOnError: false })
            .resize(300, 254,{
    fit: sharp.fit.inside,
    withoutEnlargement: true
  })
            .toFormat("jpeg", { mozjpeg: true })
            .toFile(
                path.resolve(req.file.destination+'/'+req.file.filename.split(req.file.originalname.match(/\..*$/)[0])[0]+'_thumbnail.jpeg')
            )
 res.status(200).json({img:req.file.filename,thumbnail:req.file.filename.split(req.file.originalname.match(/\..*$/)[0])[0]+'_thumbnail.jpeg', msg:'UPLOAD COMPLETE'})
    }else{
 res.status(200).json({msg:'UPLOAD FAILED' })
    }
              
  })


export default handler;