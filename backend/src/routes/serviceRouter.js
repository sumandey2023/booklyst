const express = require("express");
const router = express.Router();
const ServiceSchema = require("../models/serviceSchema");
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

module.exports = router;
