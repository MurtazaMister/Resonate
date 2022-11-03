import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
const crypto = require('crypto')

const storage = new GridFsStorage({
    url: process.env.mongoURI,
    file: (req, file)=>{
        return new Promise((resolve, reject)=>{
            crypto.randomBytes(16, (err,buf)=>{
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex')+path.extname(file.originalname);
                const fileinfo = {
                    filename: filename,
                    bucketName: type, // can be 'songs' or 'images'
                }
                resolve(fileinfo);
            })
        })
    }
})

export default storage;