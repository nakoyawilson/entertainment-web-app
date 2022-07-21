const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const entertainmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    reqiured: true,
  },
  isBookmarked: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    regular: {
      small: String,
      medium: String,
      large: String,
    },
    trending: {
      small: String,
      large: String,
    },
  },
});

module.exports = mongoose.model("Entertainment", entertainmentSchema);
