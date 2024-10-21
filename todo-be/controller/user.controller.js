const User = require("../model/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입이 된 유저 입니다.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await User.create({ name, email, password: hash });

    res.status(200).json({ status: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = user.generateToken();

      return res.status(200).json({ status: "로그인 성공", user, token });
    }
    throw new Error("회원 정보가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = userController;
