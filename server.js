const http = require('http');
const express = require("express");
const mongoose = require("mongoose");

const postRoute = require("./routes/posts")

const app = express();

app.use(express.json());

mongoose.connect(
  `mongodb+srv://rsand:<password>@cluster0.9qtpy.mongodb.net/Steps?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(postRoute);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
