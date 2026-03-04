const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Restaurant",
  new mongoose.Schema({
    name: String,
    image: String,
    imageUrl: String,
    description: String,
    address: String,
    phone: String,
    cuisine: String,
    deliveryTime: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true }
  })
);