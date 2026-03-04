const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  const r = await Restaurant.create({ ...req.body, ownerId: req.user.id });
  res.json(r);
};

exports.getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRestaurant = async (req, res) => {
  res.json(await Restaurant.findById(req.params.id));
};

exports.getRestaurants = async (req, res) => {
  res.json(await Restaurant.find());
};

exports.updateRestaurant = async (req, res) => {
  res.json(await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteRestaurant = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};