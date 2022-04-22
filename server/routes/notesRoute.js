const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
} = require("../controllers/notes");

router.get("/get-Notes/:token", getNotes);

router.get("/get-Note/:noteId", getNote);

router.post("/add-Note", addNote);

router.delete("/delete-Note/:noteId", deleteNote);

router.put("/update-Note/:noteId", updateNote);

module.exports = router;
