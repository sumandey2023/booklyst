const express = require("express");
const router = express.Router();
const ServiceDetails = require("../models/serviceSchema");
router.get("/getServiceDetails", async (req, res) => {
  try {
    const services = await ServiceDetails.find();
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
