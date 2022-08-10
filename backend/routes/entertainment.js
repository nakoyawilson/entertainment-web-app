const express = require("express");
const {
  getAllEntertainment,
  getSingleEntertainment,
  createEntertainment,
  deleteEntertainment,
  updateEntertainment,
} = require("../controllers/entertainmentController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all entertainment
router.get("/", getAllEntertainment);

// GET a single movie or TV series
router.get("/:id", getSingleEntertainment);

// POST a new movie or TV series
router.post("/", createEntertainment);

// DELETE a movie or TV series
router.delete("/:id", deleteEntertainment);

// UPDATE a movie or TV series
router.patch("/:id", updateEntertainment);

module.exports = router;
