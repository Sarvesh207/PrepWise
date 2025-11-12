const mongoose = require("mongoose");
const experienceSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = { Experience };
