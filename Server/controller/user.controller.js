const userModel = require("../model/user.model");

const userController = {
    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(402).json({ message: "please fill all the fields" })
            }
            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: "user already exist please signIn" })
            }
            const newUser = await userModel.create({
                name,
                email,
                password
            })

            return res.status(200).json({ message: "SignUp done", user: newUser })

        } catch (error) {
            res.status(500).json({
                message: "unable to signup right now",
                error: error.message
            })
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(402).json({ message: "please fill all the fields" })
            }

            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "email is Wrong" })
            }
            if (user.password !== password) {
                return res.status(400).json({ message: "password is Wrong" })
            }

            res.cookie("userId", user._id, { httpOnly: true })
            return res.status(200).json({ message: "signIn is perfect" })


        } catch (error) {
            res.status(500).json({
                message: "unable to signIn ,signUp first",
                error: error.message
            })
        }
    },
    logout: async (req, res) => {
        req.user = null
        return res.status(200).json({ messgae: "user logout succesfull" })
    }
}
module.exports = { userController }