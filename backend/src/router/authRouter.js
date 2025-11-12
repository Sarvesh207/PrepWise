const express = require("express");
const { User } = require("../models/user.model");
const { validateSignUpData } = require("../utils/validation");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);

// signup
authRouter.post("/signup", async (req, res) => {
  try {
    // validate
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    //  Encrypt the Password
    const passwordHash = await bcrypt.hash(password, 10);

    //
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const token = await user.getJWT();

    if (!token) {
      throw new Error("Something went wrong while registering user");
    }

    await user.save();

    const createUser = await User.findById(user._id).select(
      "-experiences -educations -posts -achievements -education -password"
    );

    if (!createUser) {
      throw Error("Something went wrong while registering user");
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: "lax", // or 'none' if you're using cross-site cookies (and must use secure: true)
    });

    res.status(201).json({
      message: "User added Successfully",
      user: createUser,
    });
  } catch (error) {
    res.send("ERROR : " + error.message);
    console.log(error);
  }
});
// login
authRouter.post("/login", async (req, res) => {
  //  Find user to get hashed password

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }
    const user = await User.findOne({ email: email }).select(
      "-experiences -educations -posts -achievements -education"
    );
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //  Create JWT Token
      const token = await user.getJWT();
      //  Add the token and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production (HTTPS)
        sameSite: "lax", // or 'none' if you're using cross-site cookies (and must use secure: true)
      });

      const {
        experiences,
        educations,
        posts,
        achievements,
        education,
        ...userData
      } = user.toObject();

      res.status(200).json({
        message: "Login Successfully",
        status: 200,
        data: userData,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});
//  logout
authRouter.post("/logout", async (req, res) => {
  //  TODO :
  res.cookie("token", null),
    {
      expires: new Date(Date.now()),
    };

  res.send({ message: "user Logout successfully" });
});

authRouter.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //  extract user details
    const { sub, email, picture, given_name, family_name } = payload;
    console.log("Verified User", payload);

    //  check user already exists find

    let user = await User.findOne({ googleId: sub });
    console.log("userFound", user);

    if (!user) {
      user = new User({
        googleId: sub,
        email,
        firstName: given_name,
        lastName: family_name,
        photoUrl: picture,
      });
      console.log("userFound", user);

      await user.save();
    }

    const jwtToken = await user.getJWT();

    if (!jwtToken) {
      throw new Error("Something went wrong while registering user");
    }

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: "lax", // or 'none' if you're using cross-site cookies (and must use secure: true)
    });

    res.status(200).json({
      message: user.isNew ? "User added successfully" : "User login successful",
      user: user,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(401).json({ message: error });
  }
});
module.exports = authRouter;
