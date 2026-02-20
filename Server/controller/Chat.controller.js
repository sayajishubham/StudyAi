const { initRetriever, askQuestion } = require("../Services/ragService");

const chatController = {
    chat: async (req, res) => {
        try {
            const { _id } = req.user;


            const { question } = req.body;
            await initRetriever();


            const result = await askQuestion(question, _id.toString());

            res.status(200).json({ result })

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "chat failed", message: error.message });
        }
    }
}


module.exports = { chatController };