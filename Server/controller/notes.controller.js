const { initVectorStore, getVectorStore } = require("../Services/embeddingService");
const { generateNotes } = require("../Services/notesService");

const NotesController = {
    getNotes: async (req, res) => {
        const { DocId } = req.body;
        const { _id } = req.user;
        const userId = _id.toString();
        await initVectorStore();

        const vectorStore = getVectorStore();

        const docs = await vectorStore.similaritySearch(
            "Summarize entire document",
            20,
            { $and: [{ userId: userId }, { documentId: DocId }] }
        );
        console.log("docs are", docs.length)
        const chunks = docs.map(doc => ({
            content: doc.pageContent
        }));
        const notes = await generateNotes(chunks);
        res.json({
            message: "Notes generated successfully",
            notes
        });
    }
}

module.exports = { NotesController }