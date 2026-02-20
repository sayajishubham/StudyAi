require("dotenv").config()
const express = require("express")
const cors = require("cors")
const UploadRouter = require("./Routes/Upload.Route")
const chatRouter = require("./Routes/chat.route")
const UserRouter = require("./Routes/user.route")
const { connection } = require("./utils/db")
const cookie_parser = require("cookie-parser")
const notesRouter = require("./Routes/notes.route")


const app = express()
app.use(express.json())
app.use(cookie_parser())
app.use("/upload", UploadRouter)
app.use("/chat", chatRouter)
app.use("/user", UserRouter)
app.use("/notes", notesRouter)

async function startServer() {
    try {

        await connection
        console.log("mongo connected ")
        const Port = process.env.PORT || 5000
        app.listen(Port, () => {
            console.log(`server is running on ${Port}`)
        })
    } catch (error) {
        console.log("<<<< error starting >>>>>")
    }
}
startServer()