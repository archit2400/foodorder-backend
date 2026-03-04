const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: Array,
    totalAmount: Number,
    deliveryAddress: String,
    paymentMethod: String,
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending"
    },
    createdAt: { type: Date, default: Date.now }
  })
);