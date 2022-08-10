const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        _id: user._id,
        token,
        bookmarks: user.bookmarks,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    const errors = JSON.parse(error.message);
    res.status(400).json(errors);
  }
};

const loginDemoUser = async (req, res) => {
  try {
    const user = await User.login(
      process.env.DEMO_EMAIL,
      process.env.DEMO_PASSWORD
    );
    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      token,
      bookmarks: user.bookmarks,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    const errors = JSON.parse(error.message);
    res.status(400).json(errors);
  }
};

const signupUser = async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  try {
    const user = await User.signup(email, password, repeatPassword);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        _id: user._id,
        token,
        bookmarks: user.bookmarks,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    const errors = JSON.parse(error.message);
    res.status(400).json(errors);
  }
};

const updateBookmarks = async (req, res) => {
  console.log(req.params, req.body);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { bookmarks: req.body },
    { new: true }
  );
  console.log(user);
  if (!user) {
    return res.status(404).json({ error: "Unable to update bookmarks" });
  }
  res.status(200).json(user);
};

module.exports = { loginUser, loginDemoUser, signupUser, updateBookmarks };
