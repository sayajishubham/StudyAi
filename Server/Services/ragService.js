const { ChatOpenAI } = require("@langchain/openai");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { embeddings } = require("./embeddingService")
let vectorStore;
const initRetriever = async () => {
    vectorStore = await Chroma.fromExistingCollection(embeddings, { collectionName: "studyai", url: "http://localhost:8000" })
};

const askQuestion = async (question, userId) => {
    const results = await vectorStore.similaritySearch(
        question,
        4,
        { userId }
    )
    const context = results.map((doc, i) => `source ${i + 1}(page ${doc.metadata.page},${doc.metadata.heading}):${doc.pageContent}`).join("\n\n");


    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini",
        temperature: 0.2
    });

    const response = await model.invoke([
        {
            role: "system",
            content: "You are StudyAI, an intelligent study assistant."
        },
        {
            role: "user",
            content: `
Use ONLY the context below to answer the question.

If answer is not in context, say "I couldn't find this in the document."

Context:
${context}

Question:
${question}

Answer clearly and cite sources like (Page X).
`
        }
    ]);

    return {
        answer: response.content,
        sources: results.map(r => ({
            page: r.metadata.page,
            heading: r.metadata.heading
        }))
    };

}
module.exports = {
    initRetriever,
    askQuestion
};