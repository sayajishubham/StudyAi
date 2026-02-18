require("dotenv").config()
const express = require("express")
const cors = require("cors")
const UploadRouter = require("./Routes/Upload.Route")
const chatRouter = require("./Routes/chat.route")


const app = express()
app.use(express.json())
app.use("/upload", UploadRouter)
app.use("/chat", chatRouter)

async function startServer() {
    try {
        const Port = process.env.PORT || 5000
        app.listen(Port, () => {
            console.log(`server is running on ${Port}`)
        })
    } catch (error) {
        console.log("<<<< error starting >>>>>")
    }
}
startServer()