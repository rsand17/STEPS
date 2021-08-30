const http = require("http");
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const postRoute = require("./routes/posts")
const postNumberRoute = require("./routes/postsnumber")
const topCreatorsRoute = require("./routes/statistics/topcreators")
const runtimesRoute = require("./routes/statistics/runtimes")

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(postRoute);
app.use(postNumberRoute);
app.use(topCreatorsRoute);
app.use(runtimesRoute);

app.use(express.json());

mongoose.connect(
  `mongodb+srv://rsand:rsand@cluster0.9qtpy.mongodb.net/Steps?retryWrites=true&w=majority`,
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

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
