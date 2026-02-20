const { ChatOpenAI } = require("@langchain/openai");

const generateNotes = async (chunks) => {

    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini",
        temperature: 0.3
    });

    const combinedText = chunks
        .slice(0, 10)
        .map(c => c.content)
        .join("\n\n");

    const response = await model.invoke([
        {
            role: "system",
            content: "You are an expert academic note generator. Always respond in valid JSON format."
        },
        {
            role: "user",
            content: `
Generate structured study notes from the content below.

Return ONLY valid JSON in this exact format:

{
  "summary": "string",
  "keyConcepts": ["string", "string"],
  "definitions": [
      { "term": "string", "definition": "string" }
  ],
  "fiveMarkQuestions": ["string"],
  "tenMarkQuestions": ["string"]
}

Content:
${combinedText}
`
        }
    ]);

    const parsedResponse = JSON.parse(response.content)
    return parsedResponse;
};

module.exports = { generateNotes };
