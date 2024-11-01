const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required:true
    },
    email: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    message: {
      type: String,
      // required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);
