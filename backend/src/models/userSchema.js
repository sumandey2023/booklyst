const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phNo: [
    {
      type: Number,
    },
  ],
  clerkId: {
    type: String,
    unique: true,
    sparse: true,
  },
  accountType: {
    type: String,
    enum: ["userAccount", "businessAccount"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
