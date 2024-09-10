const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

// ==========================Controller for sign up/ register a new user ==================
const register = async (req, res, next) => {
  console.log(req.body);

  const { email, password, repeatPassword } = req.body;

  if (!email) {
    return res.next(customError("please provide an email address", 400));
  }

  if (!password) {
    return res.next(customError("please provide a password", 400));
  }

  if (password !== repeatPassword) {
    return res.next(customError("passwords do not match", 400));
  }

  // bcrypt - for hashing and unhashing passwords

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    // return res.status(500).json({ message: error });

    if (error.code === 11000 && error.keyValue.email) {
      return next(customError("email already Exists", 401));
    }
    if (error.errors.email.message) {
      return next(customError(error.error.email.message, 400));
    }
    next(customError("something went wrong", 500));
  }
};

// ===== controller to login an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.next(customError("please provide an email address", 400));
  }

  if (!password) {
    return res.next(customError("please provide a password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("user does not exist", 401));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("Wrong password", 400));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(200).json({ message: "Login Succesful", token });
};

// =============CONTROLLER TO getUser based on Valid token===========
const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json;
  ({ id: userId });
};

module.exports = { register, login, getUser };
