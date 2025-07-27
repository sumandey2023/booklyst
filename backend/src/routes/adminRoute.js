const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const ServiceDetails = require("../models/serviceSchema");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Schedule = require("../models/usescheduleSchema");

const User = require("../models/userSchema");
const jwt = require("jsonwebtoken"); // missing import
const protectedRoute = require("../middleware/protectedRoute");
// You can remove protectedRoute if you want this route public
const emailJwtSign = (email) => {
  const payload = { email };
  const secret = process.env.JWT_SECRET || "shhhhh";
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};
router.get("/fetchserviceadmindata", protectedRoute, async (req, res) => {
  try {
    const userEmail = req.user;
    const user = await User.findOne({ email: userEmail }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const services = await ServiceDetails.aggregate([
      {
        $match: {
          uploadedBy: user._id,
        },
      },
      {
        $lookup: {
          from: "schedules",
          localField: "uploadedBy",
          foreignField: "uploadedBy",
          as: "schedules",
        },
      },
    ]);

    if (!services.length) {
      console.log("No services found for:", userEmail);
    }
    console.log(services);
    const phNo = await User.findOne({ email: userEmail }).select("phNo");
    services[0]["phNo"] = phNo.phNo;
    console.log(services);
    res.json(services);
  } catch (error) {
    console.error("Error fetching service admin data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateNumber", protectedRoute, async (req, res) => {
  const userEmail = req.user;
  const user = await User.findOne({ email: userEmail }).select("_id");
  const { updated } = req.body;
  console.log(updated);
  let v = updated.map((e) => {
    const str = e.toString();
    if (str.length == 12) {
      return parseInt(str);
    } else {
      throw new Error(`Invalid phone number`);
    }
  });

  user.phNo = v;
  await user.save();
});

module.exports = router;
