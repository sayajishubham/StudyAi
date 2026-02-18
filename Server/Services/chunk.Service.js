const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const chunkSection = async (pages) => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 800,
        chunkOverlap: 120,
    });
    const documents = [];
    for (const page of pages) {
        for (const section of page.Sections) {
            if (!section.content.trim()) continue;

            const chunks = await splitter.splitText(section.content);

            chunks.forEach(chunk => {
                documents.push({
                    content: chunk,
                    metadata: {
                        page: page.pageNumber,
                        heading: section.heading
                    }
                });
            });
        }
    }
    return documents;
};
module.exports = { chunkSection };