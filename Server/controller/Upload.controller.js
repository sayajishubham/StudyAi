const document = require("../model/document.model");
const { chunkSection } = require("../Services/chunk.Service");
const { initVectorStore, storeChunks } = require("../Services/embeddingService");
const { extractPdfText } = require("../Services/pdfProcessor");

const UploadController = {
    uploadPdf: async (req, res) => {
        try {
            const userId = req.cookies.userId;
            const filePath = req.file.path;
            const newDoc = await document.create({
                userId,
                fileName: req.file.originalname,
                filePath
            })
            const pages = await extractPdfText(filePath)
            const chunks = await chunkSection(pages)
            await initVectorStore();
            await storeChunks(chunks, userId.toString(), newDoc._id.toString());
            res.json({
                message: "PDF processed and embedded successfully",
                documentId: newDoc._id
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to process PDF", details: error.message });
        }
    }
}
module.exports = { UploadController } 