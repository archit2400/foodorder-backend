const mongoose = require("mongoose");

module.exports = mongoose.model(
  "FoodItem",
  new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    name: String,
    image: String,
    price: Number,
    category: String,
    isAvailable: { type: Boolean, default: true }
  })
);