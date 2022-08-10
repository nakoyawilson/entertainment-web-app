const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: "Entertainment" }],
});

userSchema.statics.signup = async function (email, password, repeatPassword) {
  let errors = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  if (!email) {
    errors.email = "Can't be empty";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email not valid";
  }

  if (!password) {
    errors.password = "Can't be empty";
  } else if (!validator.isStrongPassword(password)) {
    errors.password = "Not strong enough";
  }

  if (!repeatPassword) {
    errors.repeatPassword = "Can't be empty";
  }

  if (!Object.values(errors).every((error) => error === "")) {
    throw Error(JSON.stringify(errors));
  }

  if (password !== repeatPassword) {
    errors.password = "Must match";
    errors.repeatPassword = "Must match";
    throw Error(JSON.stringify(errors));
  }

  const exists = await this.findOne({ email });
  if (exists) {
    errors.email = "Already in use";
    throw Error(JSON.stringify(errors));
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  let errors = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Can't be empty";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email not valid";
  }

  if (!password) {
    errors.password = "Can't be empty";
  }

  if (!Object.values(errors).every((error) => error === "")) {
    throw Error(JSON.stringify(errors));
  }

  const user = await this.findOne({ email });
  if (!user) {
    errors.email = "Incorrect email";
    throw Error(JSON.stringify(errors));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.password = "Incorrect password";
    throw Error(JSON.stringify(errors));
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
