const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require('crypto')

require("dotenv").config();

const storage_songs = new GridFsStorage({
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
                    bucketName: 'songs',
                }
                resolve(fileinfo);
            })
        })
    }
})

const storage_images = new GridFsStorage({
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
                    bucketName: 'images',
                }
                req.fileinfo = fileinfo;
                resolve(fileinfo);
            })
        })
    }
})

module.exports = {
    storage_songs,
    storage_images,
}