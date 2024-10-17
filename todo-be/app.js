const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = "mongodb://localhost:27017/todo-demo";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("몽고db연결");
  })
  .catch((err) => console.log("몽고디비 연결에러"));

app.listen(8000, () => {
  console.log("8000 연결됨");
});
