const express = require("express");
const router = express.Router();
const UserSchema = require("../models/userSchema");
const protectedRoute = require("../middleware/protectedRoute");
router.get("/getUserData", protectedRoute, async (req, res) => {
  try {
    const email = req.user; // req.user is set to authenticated email in middleware
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update user's accountType (userAccount | businessAccount)
router.patch("/updateAccountType", protectedRoute, async (req, res) => {
  try {
    const email = req.user;
    const { accountType } = req.body;

    if (!accountType || !["userAccount", "businessAccount"].includes(accountType)) {
      return res.status(400).json({ message: "Invalid accountType" });
    }

    const updatedUser = await UserSchema.findOneAndUpdate(
      { email },
      { accountType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating accountType:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
