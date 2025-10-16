import express from "express";
import { createNote, getNotes, deleteNote, updateNote } from "../controllers/note.controller.js";

const router = express.Router();
router.post("/", createNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

export default router;
