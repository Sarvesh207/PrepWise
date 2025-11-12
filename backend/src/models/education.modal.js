const mongoose = require("mongoose"); 

const educationSchema = new mongoose.Schema(
  {
    college: { // fixed typo
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    startYear: {
      type: Date,
      required: true,
    },
    endYear: {
      type: Date,
      default: null,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    cgpa: {
      type: String,
      default: null,
      trim: true,
    },
    user: { // reference to the user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = { Education };
