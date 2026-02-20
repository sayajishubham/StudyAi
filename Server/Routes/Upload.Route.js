const express = require("express")
const { upload } = require("../utils/multer")
const { UploadController } = require("../controller/Upload.controller")
const authMiddleware = require("../middleware/auth.middleware")
const UploadRouter = express.Router()

UploadRouter.post('/', upload.single("pdf"), authMiddleware, UploadController.uploadPdf)
module.exports = UploadRouter