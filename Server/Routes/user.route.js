const express = require("express")
const { userController } = require("../controller/user.controller")
const UserRouter = express.Router()

UserRouter.post('/signin', userController.signIn)
UserRouter.post('/signup', userController.signUp)
UserRouter.post('/logout', userController.logout)
module.exports = UserRouter