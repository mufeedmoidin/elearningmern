const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    level: {
      type: String,
    },
    price: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },

    roadmap: [],
    chapters: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", CourseSchema);
