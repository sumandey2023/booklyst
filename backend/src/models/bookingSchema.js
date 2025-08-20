const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    slot: {
      type: String,
      required: true,
    },
    date: {
      type: String, // can also use Date if you want exact date object
      required: true,
    },
    time: {
      type: String, // string because you are storing like "12:59"
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
    },
    location: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["UPI", "Credit Card", "Cash"], 
      required: true,
    },
    note: {
      type: String,
      maxlength: 300,
      default: "",
    },

    // 🔹 Who requested the booking (user/customer)
    requestBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Booking is for which service / provider
    requestFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    // 🔹 Booking status
    requestStage: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
