const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/notesRoute");
const auth = require("./routes/auth");
const connectDB = require("./db/db");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize our APP
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/", notesRouter);
app.use("/api/auth", auth);

//config env variables

dotenv.config();

// DATABASE

connectDB();

// PORT

const PORT = process.env.PORT || 8000;

// Routes

// app.get("/api", function (req, res) {
//   res.send("Welcome to api");
// });

// app.use((req, res) => {
//   res.status(404).send({ status: 404, message: "Sorry cant't find that!" });
// });

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"))
  const path = require("path");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

app.listen(PORT, function () {
  console.log("Server Started on PORT 8000");
});
