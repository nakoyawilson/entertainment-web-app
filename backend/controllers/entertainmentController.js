const Entertainment = require("../models/entertainmentModel");
const mongoose = require("mongoose");

// Get all entertainment
const getAllEntertainment = async (req, res) => {
  const entertainment = await Entertainment.find({});
  res.status(200).json(entertainment);
};

// Get a single movie or TV series
const getSingleEntertainment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  const entertainment = await Entertainment.findById(id);
  if (!entertainment) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  res.status(200).json(entertainment);
};

// Create a new movie or TV series
const createEntertainment = async (req, res) => {
  const { title, year, category, rating, isBookmarked, isTrending, thumbnail } =
    req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!year) {
    emptyFields.push("year");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!rating) {
    emptyFields.push("rating");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields: ", emptyFields });
  }
  try {
    const entertainment = await Entertainment.create({
      title,
      year,
      category,
      rating,
      isBookmarked,
      isTrending,
      thumbnail,
    });
    res.status(200).json(entertainment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a movie or TV series
const deleteEntertainment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  const entertainment = await Entertainment.findOneAndDelete({ _id: id });
  if (!entertainment) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  res.status(200).json(entertainment);
};

// Update a movie or TV series
const updateEntertainment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  const entertainment = await Entertainment.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!entertainment) {
    return res.status(404).json({ error: "No such movie or TV series" });
  }
  res.status(200).json(entertainment);
};

module.exports = {
  getAllEntertainment,
  getSingleEntertainment,
  createEntertainment,
  deleteEntertainment,
  updateEntertainment,
};
