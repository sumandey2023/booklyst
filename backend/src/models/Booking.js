const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceDetails",
      required: true,
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);
module.exports = mongoose.model("Booking", bookingSchema);
