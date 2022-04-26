
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    // .connect("mongodb://localhost:27017/myNotesDB", { useNewUrlParser: true })
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mynotes.xymwr.mongodb.net/myNotesDB?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log("Connected to DataBase :)"))
    .catch((err) => console.log(err));
};


module.exports = connectDB;