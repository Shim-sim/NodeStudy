const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("몽고db연결");
  })
  .catch((err) => console.log("몽고디비 연결에러"));

app.listen(8000, () => {
  console.log("8000 연결됨");
});
