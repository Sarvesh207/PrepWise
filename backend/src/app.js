const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./models/user.model");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const requestRouter = require("./router/requestRouter");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8081"],
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database connection establish");
    app.listen(8080, () => {
      console.log("Server is listing on port 8080...");
    });
  })
  .catch((Error) => {
    console.error("Database connection failed", Error);
  });
