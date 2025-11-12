const jwt = require("jsonwebtoken");
const {User} = require("../models/user.model");
const userAuth = async (req, res, next) => {
  try {
    //  Read the token from thr req
    const { token } = req.cookies;


    if (!token) {
      throw new Error('Token is not valid');
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder@207");
    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
    // Validate the token
    //  Find the user
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
};


module.exports ={
    userAuth
}
