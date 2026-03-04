const Cart = require("../models/Cart");
const Food = require("../models/FoodItem");

exports.addToCart = async (req, res) => {
  const { foodId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [], totalAmount: 0 });

  // Handle default menu items vs database items
  let itemPrice = 0;
  if (typeof foodId === 'string' && foodId.startsWith('def-')) {
    const defaultItemsData = {
      "def-1": 150, "def-2": 220, "def-3": 240, "def-4": 280,
      "def-5": 120, "def-6": 140, "def-7": 90, "def-8": 250,
      "def-9": 180, "def-10": 140
    };
    itemPrice = defaultItemsData[foodId] || 0;
  } else {
    const food = await Food.findById(foodId);
    if (food) itemPrice = food.price;
  }

  cart.items.push({ foodId, quantity });
  cart.totalAmount += itemPrice * quantity;

  await cart.save();
  res.json(cart);
};

exports.getCart = async (req, res) => {
  // Since we mix ObjectId and Strings, populate won't work perfectly for string IDs.
  // The frontend handles finding the right image/name from local storage or its own lists usually
  // but we can just populate what we can
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.foodId");
  res.json(cart);
};

exports.removeItem = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter(i => i.foodId.toString() !== req.params.foodId);
  await cart.save();
  res.json(cart);
};