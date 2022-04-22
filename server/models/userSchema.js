const mongoose = require("mongoose");
const notesSchema = require("./notesSchema");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    select: false,
  },
  myNotes: [notesSchema],
});

module.exports = userSchema;
