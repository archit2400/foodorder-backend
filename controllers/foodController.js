const Food = require("../models/FoodItem");

exports.createFood = async (req, res) => {
  const food = await Food.create({ ...req.body, restaurantId: req.params.restaurantId });
  res.json(food);
};

exports.getByRestaurant = async (req, res) => {
  res.json(await Food.find({ restaurantId: req.params.restaurantId }));
};

exports.getMyRestaurantFoods = async (req, res) => {
  const Restaurant = require("../models/Restaurant");
  const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

  const foods = await Food.find({ restaurantId: restaurant._id });
  res.json(foods);
};

exports.updateFood = async (req, res) => {
  res.json(await Food.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};