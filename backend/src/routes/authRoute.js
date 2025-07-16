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

router.post(
  "/createUserSetup",
  protectedRoute,
  upload.array("images"),
  async (req, res) => {
    try {
      console.log("hi");
      const rawContent = JSON.parse(req.body.content);
      const content = rawContent.map(({ type, value }) => ({ type, value }));
      const files = req.files;
      let fileIndex = 0;
      for (let i = 0; i < content.length; i++) {
        if (content[i].type === "image") {
          const file = files[fileIndex];

          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "blocks" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          });

          content[i].value = uploadResult.secure_url;
          fileIndex++;
        }
      }

      let uploadedById = null;

      // Optional: Try finding user by email if it exists in the request
      if (req.user) {
        const foundUser = await User.findOne({ email: req.user }).select("_id");
        if (foundUser) {
          uploadedById = foundUser._id;
        }
      }

      const newBlock = new ServiceDetails({
        ServiceType: req.body.type,
        content,
        ...(uploadedById && { uploadedBy: uploadedById }), // Only include if found
      });

      await newBlock.save();

      res.status(201).json({ success: true, data: newBlock });
    } catch (error) {
      console.error("Create Block Error:", error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

router.post("/schedule", async (req, res) => {
  try {
    const { timeLimit, availability } = req.body;

    console.log(timeLimit, availability);

    const newSchedule = new Schedule({
      timeLimit,
      availability,
    });

    await newSchedule.save();

    res.status(201).json({ message: "Schedule saved successfully!" });
  } catch (err) {
    console.error("Error saving schedule:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/schedule", async (req, res) => {
  try {
    const { timeLimit, availability } = req.body;
    console.log(timeLimit, availability);

    const newSchedule = new Schedule({ timeLimit, availability });
    await newSchedule.save();

    res.status(201).json({ message: "Schedule saved successfully!" });
  } catch (err) {
    console.error("Error saving schedule:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// 🔐 Route: Clerk Authentication Handler
router.post("/clerk-auth", async (req, res) => {
  try {
    const { clerkId, name, email } = req.body.payload;

    console.log(clerkId, name, email);
    if (!clerkId || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    let createdNew = false;
    console.log("hi1");
    if (user) {
      user.clerkId = clerkId;
      user.name = name;
      await user.save();
    } else {
      console.log("hi2");
      user = await new User({ clerkId, name, email }).save();
      console.log("hi3");
      createdNew = true;
    }

    res.cookie("token", emailJwtSign(email), {
      signed: true,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(email);
    return res.status(createdNew ? 201 : 200).json({
      message: createdNew ? "User created" : "User updated",
      email,
    });
  } catch (err) {
    console.error("Error in /clerk-auth:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signOut", protectedRoute, (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      signed: true,
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing out" });
  }
});

module.exports = router;
