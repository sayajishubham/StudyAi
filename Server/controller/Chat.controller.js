const { initRetriever, askQuestion } = require("../Services/ragService");

const chatController = {
    chat: async (req, res) => {
        try {
            const { question } = req.body;
            await initRetriever();


            const result = await askQuestion(question, "user123");
            console.log(result)
            res.status(200).json({ result })

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "chat failed" });
        }
    }
}


module.exports = { chatController };