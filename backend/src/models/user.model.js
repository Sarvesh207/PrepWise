const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Experience = require("./experience.modal");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 14,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 14,
    },
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    educations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
    },

    countryCode: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxLength: 12,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder@207", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashed = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHashed
  );

  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
