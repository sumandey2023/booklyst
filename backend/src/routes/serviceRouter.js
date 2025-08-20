const express = require("express");
const router = express.Router();
const protectedRoute = require("../middleware/protectedRoute");
const ServiceSchema = require("../models/serviceSchema");
const Schedule = require("../models/usescheduleSchema");
const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const User = require("../models/userSchema");
router.get("/getServiceDetails", async (req, res) => {
  try {
    const services = await ServiceSchema.find();
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getSerchedService", async (req, res) => {
  const { search } = req.query;
  try {
    const services = await ServiceSchema.find({
      $or: [{ ServiceType: { $regex: search, $options: "i" } }],
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/getSpacificServiceDetails/:id",
  protectedRoute,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate ObjectId first to avoid Mongo errors
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }

      const service = await ServiceSchema.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "schedules", // 1st join
            localField: "uploadedBy",
            foreignField: "uploadedBy",
            as: "schedule",
          },
        },
        {
          $lookup: {
            from: "users", // 2nd join
            localField: "uploadedBy",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ]);

      if (!service.length) {
        return res.status(404).json({ error: "Service not found" });
      }

      res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/bookservice", protectedRoute, async (req, res) => {
  try {
    const { id, details } = req.body;

    if (!id || !details) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }
    const user = await User.findOne({ email: req.user }).select("_id");
    const request = user._id;

    const newBooking = new Booking({
      slot: details.slot,
      date: details.date,
      time: details.time,
      phone: details.phone,
      location: details.location,
      payment: details.payment,
      note: details.note || "",
      requestBy: request,
      requestFor: id, // ✅ service/provider id
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
