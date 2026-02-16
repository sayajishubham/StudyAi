require("dotenv").config()
const express = require("express")
const cors = require("cors")
const UploadRouter = require("./Routes/Upload.Route")


const app = express()

app.use("/upload", UploadRouter)


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