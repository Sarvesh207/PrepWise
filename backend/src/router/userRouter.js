const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { ConnectionRequest } = require("../models/connectionRequest.modal");
const {
  sanitizeFilter,
  ConnectionStates,
  isObjectIdOrHexString,
} = require("mongoose");
const { User } = require("../models/user.model");
const { Education } = require("../models/education.modal");
const { Experience } = require("../models/experience.modal");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

const { parseDate } = require("../utils/dateFormat");
userRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("experiences")
      .populate("educations");

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json({
        message: "User data fetched successfully",
        status: 200,
        data: user,
      });
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

userRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isEditAllowed = validateEditProfileData(req);

    if (!isEditAllowed) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    const allowedEditFields = [
      "firstName",
      "userName",
      "lastName",
      "phoneNumber",
      "countryCode",
      "gender",
      "about",
      "skills",
      "email",
    ];

    // Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    const updatedFields = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowedEditFields.includes(key)
      )
    );

    // await loggedInUser.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updatedFields,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

userRouter.get("/profile/connections/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId");
    res.json({
      message: "Connection request data fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

userRouter.get("/profile/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //   get the mutual connection  the people that I have send connection request
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (loggedInUser._id.toString() === row.fromUserId._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/user/add-education", userAuth, async (req, res) => {
  try {
    const { college, degree, startYear, endYear, isPresent, cgpa } = req.body;

    const userId = req.user._id;
    const education = new Education({
      college,
      degree,
      startYear,
      endYear,
      isPresent,
      cgpa,
      user: userId,
    });

    await education.save();

    //  Add education refference to user education array ;
    const user = await User.findById(userId);
    user.educations.push(education);
    await user.save();

    res.status(201).json({
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

userRouter.patch("/user/update-education/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const updated = req.body;

    const education = await Education.findOne({ _id: id, user: req.user.id });
    if (!education) {
      res.status(404).json({ error: "No Education found" });
    }

    Object.keys(updated).forEach((key) => {
      education[key] = updated[key];
    });
    await education.save();

    res.status(200).json({
      message: "Education Updated Successfully",
      educations: education,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update education" });
  }
});

userRouter.delete("/user/delete-education/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      res.status(404).json({ error: "No Education found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { educations: id },
    });
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch educations" });
  }
});
userRouter.get("/user/educations", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("educations");
    res.status(200).json({
      education: user.educations,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch educations" });
  }
});

userRouter.post("/user/add-experience", userAuth, async (req, res) => {
  console.log("Working", req.body);
  try {
    const {
      designation,
      company,
      location,
      isPresent,
      startDate,
      endDate,
      description,
    } = req.body;
    let parsedStartDate = parseDate(startDate);
    let parsedEndDate = parseDate(endDate);
    console.log("parseDate", parsedEndDate, parsedStartDate)

    if (!parsedStartDate || (!isPresent && !parsedEndDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const userId = req.user._id;
    const experience = new Experience({
      company,
      location,
      isPresent,
      designation,
      location,
      description,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      user: userId,
    });

    await experience.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    user.experiences.push(experience);

    await user.save();

    res.status(201).json({
      message: "Education added successfully",
      education: experience,
    });
  } catch (error) {
    console.error("Add Experience Error:", error); // Log actual error

    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.patch("/user/update-experience/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const updates = req.body;
    console.log(updates, id, req.body);

    const experience = await Experience.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        $set: updates,
      },
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ error: " Eduction not found" });
    }

    res
      .status(200)
      .json({ message: "Education updated successfully", experience });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
userRouter.delete("/user/delete-experience/:id", userAuth, async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  const experience = await Experience.findByIdAndDelete(id);
  console.log("expDel", experience);

  if (!experience) {
    return res.status(404).json({ error: "Experience not found" });
  }
  await User.findByIdAndUpdate(req.user._id, { $pull: { experiences: id } });

  res.status(200).json({ message: "Experience deleted successfully" });
});
userRouter.get("/user/experiences", userAuth, async (req, res) => {
  console.log("getUser Experiences", req.user);
  try {
    const user = await User.findById(req.user._id).populate("experiences");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    if (!user.experiences || user.experiences.length === 0) {
      return res.status(200).json({ message: "No Experience Found" });
    }
    res.status(200).json({
      experience: user.experiences,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "Something went wrong" });
  }
});

userRouter.post("/user/add-post", userAuth, async (req, res) => {});
userRouter.patch("/user/update-post", userAuth, async (req, res) => {});
userRouter.delete("/user/delete-post", userAuth, async (req, res) => {});
userRouter.get("/user/posts", userAuth, async (req, res) => {});

module.exports = userRouter;
