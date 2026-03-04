const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.Mixed },
        quantity: Number
      }
    ],
    totalAmount: Number
  })
);