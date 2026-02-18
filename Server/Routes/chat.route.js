const express = require("express");
const { chatController } = require("../controller/Chat.controller");
const chatRouter = express.Router();


chatRouter.post("/", chatController.chat);

module.exports = chatRouter