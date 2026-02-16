const { extractPdfText } = require("../Services/pdfProcessor");

const UploadController = {
    uploadPdf: async (req, res) => {
        try {
            const filePath = req.file.path;
            const pages = await extractPdfText(filePath)
            res.json({
                message: "PDF processed successfully",
                totalPages: pages.length,
                sample: pages[0]
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to process PDF", details: error.message });
        }
    }
}
module.exports = { UploadController } 