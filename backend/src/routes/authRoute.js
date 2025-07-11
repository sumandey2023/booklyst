const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const BusinessDetails = require("../models/BusinessDetails");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Schedule = require("../models/usescheduleSchema");
// You can remove protectedRoute if you want this route public
router.post("/createUserSetup", upload.array("images"), async (req, res) => {
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

    const newBlock = new BusinessDetails({
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
});

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

module.exports = router;
