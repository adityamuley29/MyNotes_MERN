
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/myNotesDB", { useNewUrlParser: true })
    .then(() => console.log("Connected to Server :)"))
    .catch((err) => console.log(err));
};


module.exports = connectDB;