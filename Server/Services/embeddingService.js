const { OpenAIEmbeddings } = require("@langchain/openai");
const { Chroma } = require("@langchain/community/vectorstores/chroma");

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
});

let vectorStore;

const initVectorStore = async () => {
    vectorStore = await Chroma.fromExistingCollection(
        embeddings,
        {
            collectionName: "studyai",
            url: "http://localhost:8000",
        }
    ).catch(async () => {
        return await Chroma.fromDocuments(
            [],
            embeddings,
            {
                collectionName: "studyai",
                url: "http://localhost:8000",
            }
        );
    });
};
const storeChunks = async (chunks, userId, documentId) => {
    const formattedDocs = chunks.map(chunk => ({
        pageContent: chunk.content,
        metadata: {
            ...chunk.metadata,
            userId,
            documentId
        }
    }));

    await vectorStore.addDocuments(formattedDocs);
};
const getVectorStore = () => {
    if (!vectorStore) {
        throw new Error("Vector store not initialized");
    }
    return vectorStore;
};
module.exports = { initVectorStore, storeChunks, embeddings, getVectorStore };