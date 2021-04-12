import path from 'path'
import express from 'express'
import multer from 'multer'
import pkg from 'cloudinary'
import asyncHandler from "express-async-handler";

const cloudinary = pkg
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

/**
 * @base    /api/upload
 * */

router.post('/', upload.single('image'), asyncHandler(async(req, res) => {
    try {
        const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`)
        res.send(`${uploadPhoto.url}`)
    } catch (err) {
        console.error(err)
    }
}))

export default router
