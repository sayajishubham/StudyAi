const express = require("express");
const { chatController } = require("../controller/Chat.controller");
const authMiddleware = require("../middleware/auth.middleware");
const chatRouter = express.Router();


chatRouter.post("/", authMiddleware, chatController.chat);

module.exports = chatRouter