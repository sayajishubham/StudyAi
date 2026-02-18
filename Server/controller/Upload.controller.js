const { chunkSection } = require("../Services/chunk.Service");
const { initVectorStore, storeChunks } = require("../Services/embeddingService");
const { extractPdfText } = require("../Services/pdfProcessor");

const UploadController = {
    uploadPdf: async (req, res) => {
        try {
            const filePath = req.file.path;
            const pages = await extractPdfText(filePath)
            const chunks = await chunkSection(pages)
            await initVectorStore();
            await storeChunks(chunks, "user123", 'doc456');
            res.json({
                message: "PDF processed and embedded successfully",
                totalPages: pages.length,
                sample: pages[0],
                totalChunks: chunks.length
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to process PDF", details: error.message });
        }
    }
}
module.exports = { UploadController } 