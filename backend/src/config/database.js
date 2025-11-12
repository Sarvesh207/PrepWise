const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sarveshgaynar:nBBxA1VYtG9jTauD@cluster0.r6x0gvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
