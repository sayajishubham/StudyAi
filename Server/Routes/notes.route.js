const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { NotesController } = require("../controller/notes.controller");
const notesRouter = express.Router();

notesRouter.post('/', authMiddleware, NotesController.getNotes);
module.exports = notesRouter;