const express = require("express")
const { upload } = require("../utils/multer")
const { UploadController } = require("../controller/Upload.controller")
const UploadRouter = express.Router()

UploadRouter.post('/', upload.single("pdf"), UploadController.uploadPdf)
module.exports = UploadRouter