const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECREY_KEY = process.env.JWT_SECREY_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = () => {
  const token = jwt.sign({ _id: this._id }, JWT_SECREY_KEY);
  return token;
};

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
