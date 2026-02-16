const mongoose = require("mongoose")


const DocumentSchema = new mongoose.Schema({
    summary: { type: String },
    importantQuestions,
    keyPoints
})
const DocumentModel = mongoose.model("Document", DocumentSchema)
module.exports = DocumentModel