const express = require("express");
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
//ROUTE 2 TO create a note using PUT /api/notes/createnote
router.post(
  "/createnote",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ error: "Internal Server Error" });
    }
    const { title, description, tag } = req.body;
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  }
);

//ROUTE 3 TO update an existing note using PUT
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    try {
      let note = await Notes.findById(req.params.id);
      //If note doesn't exist
      if (!note) {
        return res.status(401).send("Invalid Note access!");
      }

      if (note.user.toString() != req.user.id) {
        return res.status(404).send("Invalid user!");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error("Internal Server Error!");
    }
  }
);
//ROUTE 4 TO delete an existing note using DELETE /api/notes/deletenote
router.delete(
  "/deletenote/:id",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      let note = await Notes.findById(req.params.id);
      //If note doesn't exist
      if (!note) {
        return res.status(401).send("Note doesn't exist!");
      }

      if (note.user.toString() != req.user.id) {
        return res.status(404).send("Invalid user!");
      }

      note = await Notes.findByIdAndDelete(req.params.id, { new: true });
      res.json({ Success: "Note deleted successfully!", note });
    } catch (error) {
      console.error("Internal Server Error");
    }
  }
);
module.exports = router;
