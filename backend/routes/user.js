const express = require("express");
const {
  loginUser,
  loginDemoUser,
  signupUser,
  updateBookmarks,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/login", loginUser);

router.post("/demologin", loginDemoUser);

router.post("/signup", signupUser);

router.use(requireAuth).patch("/:id", updateBookmarks);

module.exports = router;
