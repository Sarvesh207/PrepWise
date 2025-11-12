const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },       
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",

    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //  check the user same not not we can check this at api level

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Can not send connection request to yourself");
  }
  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequest,
};
