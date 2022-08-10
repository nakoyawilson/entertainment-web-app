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
  isTrending: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    regular: {
      small: {
        type: String,
        default: "./assets/thumbnails/default.jpg",
      },
      medium: {
        type: String,
        default: "./assets/thumbnails/default.jpg",
      },
      large: {
        type: String,
        default: "./assets/thumbnails/default.jpg",
      },
    },
    trending: {
      small: {
        type: String,
        default: "./assets/thumbnails/default.jpg",
      },
      large: {
        type: String,
        default: "./assets/thumbnails/default.jpg",
      },
    },
  },
});

module.exports = mongoose.model("Entertainment", entertainmentSchema);
