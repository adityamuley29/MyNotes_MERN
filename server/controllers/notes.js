const mongoose = require("mongoose");
const notesSchema = require("../models/notesSchema");
const userSchema = require("../models/userSchema");

const User = mongoose.model("user", userSchema);
const Note = mongoose.model("myNote", notesSchema);

exports.getNotes = (req, res) => {
  Note.find({ token: req.params.token }, function (err, notes) {
    if (err) {
      console.log(err);
    } else {
      res.send({ status: 200, myNotes: notes });
    }
  });
};

exports.getNote = (req, res) => {
  Note.findById(req.params.noteId, function (err, note) {
    if (err) {
      console.log(err);
    } else {
      res.send({ status: 200, myNote: note });
    }
  });
};

exports.addNote = (req, res) => {
  try {
    User.findById(req.body.token, (err, user) => {
      if (user) {
        const newNote = new Note({
          title: req.body.title,
          token: req.body.token,
        });
        newNote.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ status: 200, message: "Succeffully added note" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 404, message: error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.noteId);
    res.send("delete note ssuccessfully");
  } catch (error) {
    res.status(404).send({ status: 404, message: error });
  }
};

exports.updateNote = async (req, res) => {
  try {
    // const newTitle = req.body.title;
    // const newIsCompleted = req.body.isCompleted;
    await Note.findByIdAndUpdate(req.params.noteId, {
      ...req.body,
    });

    res.send("successfully updated note");
  } catch (error) {
    res.status(404).send({ status: 404, message: error });
  }
};
