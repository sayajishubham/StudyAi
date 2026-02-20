const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    subject: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
