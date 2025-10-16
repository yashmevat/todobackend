import Note from "../models/note.model.js";
import jwt from "jsonwebtoken";

export const createNote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = new Note({ ...req.body, userId: decoded.id });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const notes = await Note.find({ userId: decoded.id });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: decoded.id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ msg: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use findOneAndUpdate to ensure both _id and userId match
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: decoded.id }, // query
      req.body,                                   // update
      { new: true }                               // return the updated document
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ msg: "Note updated", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

