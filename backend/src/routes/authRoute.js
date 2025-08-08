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
      const rawContent = JSON.parse(req.body.content);
      const content = rawContent.map(({ type, value }) => ({ type, value }));
      console.log(content);
      const files = req.files || [];
      let fileIndex = 0;
      for (let i = 0; i < content.length; i++) {
        if (content[i].type === "image" && !content[i].value) {
          const file = files[fileIndex];
          if (!file || !file.buffer) {
            return res
              .status(400)
              .json({ success: false, error: "Image file is missing" });
          }

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

      const foundUser = await User.findOne({ email: req.user }).select("_id");

      if (foundUser && foundUser._id) {
        const service = await ServiceDetails.findOne({
          uploadedBy: foundUser._id,
        });

        if (service) {
          service.content = content;
          await service.save();
          return res.status(201).json({ success: true, data: service });
        }

        const newBlock = new ServiceDetails({
          ServiceType: req.body.type,
          content,
          uploadedBy: foundUser._id,
        });

        await newBlock.save();
        return res.status(201).json({ success: true, data: newBlock });
      }

      return res
        .status(404)
        .json({ success: false, error: "User not found or unauthorized" });
    } catch (error) {
      console.error("Create Block Error:", error);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

router.post("/schedule", protectedRoute, async (req, res) => {
  try {
    const { availability, serviceCharge } = req.body;
    console.log({ availability, serviceCharge });

    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ error: "Availability must be provided." });
    }

    if (!serviceCharge) {
      return res.status(400).json({ error: "Service charge is required." });
    }
    if (req.user) {
      const foundUser = await User.findOne({ email: req.user }).select("_id");
      if (foundUser) {
        uploadedById = foundUser._id;
      }
    }
    const newSchedule = new Schedule({
      availability,
      serviceCharge,
      uploadedBy: uploadedById,
    });

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
      const user = new User();
      user.clerkId = clerkId;
      user.name = name;
      user.email = email;
      await user.save();

      console.log(user);
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

router.put("/schedule", protectedRoute, async (req, res) => {
  try {
    const { blogId } = req.params;
    const { serviceCharge, availability } = req.body;
    console.log(blogId);
    const foundUser = await User.findOne({ email: req.user }).select("_id");
    const scheduleDoc = await Schedule.findOne({ uploadedBy: foundUser._id });
    if (!scheduleDoc) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    scheduleDoc.serviceCharge = serviceCharge;
    scheduleDoc.availability = availability;

    await scheduleDoc.save();

    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (err) {
    console.error("Error updating schedule:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/alradycreate", protectedRoute, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user }).select("_id");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const servicedetails = await ServiceDetails.findOne({
      uploadedBy: foundUser._id,
    });

    if (servicedetails) {
      return res.status(200).json({ alreadyCreated: true });
    } else {
      return res.status(200).json({ alreadyCreated: false });
    }
  } catch (err) {
    console.error("Error checking existing schedule:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/alradyschedule", protectedRoute, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user }).select("_id");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const schedule = await Schedule.findOne({
      uploadedBy: foundUser._id,
    });

    if (schedule) {
      return res.status(200).json({ isAlradySchedule: true });
    } else {
      return res.status(200).json({ isAlradySchedule: false });
    }
  } catch (err) {
    console.error("Error checking existing schedule:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// 🔐 Route: Send cookie to frontend after authentication
router.get("/send-cookie", protectedRoute, async (req, res) => {
  try {
    // Get the token from the signed cookie
    const token = req.signedCookies.token;
    console.log("token from cookie:", token);

    // Also send token in response for immediate use
    if (token) {
      return res.status(200).json({
        message: "Cookie sent successfully",
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized", token: null });
    }
  } catch (err) {
    console.error("Error in /send-cookie:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
