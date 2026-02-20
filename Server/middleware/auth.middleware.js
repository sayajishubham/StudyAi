const userModel = require("../model/user.model");

const authMiddleware = async (req, res, next) => {

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user;

    next();
};

module.exports = authMiddleware;
