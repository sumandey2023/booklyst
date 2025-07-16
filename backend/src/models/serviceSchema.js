const mongoose = require("mongoose");
const serviceDetailsScheama = mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ServiceType: {
      type: String,
      require: true,
    },
    content: [
      {
        type: {
          type: String,
          require: true,
        },
        value: {
          type: String,
          require: true,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const ServiceDetails = mongoose.model("ServiceDetails", serviceDetailsScheama);
module.exports = ServiceDetails;
