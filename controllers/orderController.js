const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  const defaultItemsData = {
    "def-1": { name: "Classic Espresso", price: 150 },
    "def-2": { name: "Cappuccino", price: 220 },
    "def-3": { name: "Iced Latte", price: 240 },
    "def-4": { name: "Mocha Frappuccino", price: 280 },
    "def-5": { name: "Butter Croissant", price: 120 },
    "def-6": { name: "Blueberry Muffin", price: 140 },
    "def-7": { name: "Chocolate Chip Cookie", price: 90 },
    "def-8": { name: "Avocado Toast", price: 250 },
    "def-9": { name: "Grilled Cheese Sandwich", price: 180 },
    "def-10": { name: "Classic French Fries", price: 140 }
  };

  const itemsFromRequest = req.body.items;
  if (!itemsFromRequest || itemsFromRequest.length === 0) return res.status(400).json({ message: "Cart is empty" });

  const restaurantId = req.body.restaurantId;

  const FoodItem = require("../models/FoodItem");
  const processedItems = await Promise.all(itemsFromRequest.map(async (i) => {
    const foodId = i.food || i.foodId; 
    if (typeof foodId === 'string' && foodId.startsWith('def-')) {
      const defData = defaultItemsData[foodId];
      return {
        foodId: foodId,
        name: defData ? defData.name : "Default Item",
        price: defData ? defData.price : 0,
        quantity: i.quantity
      };
    } else {
      const dbFood = await FoodItem.findById(foodId);
      return {
        foodId: foodId,
        name: dbFood ? dbFood.name : "Unknown Item",
        price: dbFood ? dbFood.price : 0,
        quantity: i.quantity
      };
    }
  }));

  const computedTotal = processedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const order = await Order.create({
    userId: req.user.id,
    restaurantId: restaurantId,
    items: processedItems,
    totalAmount: req.body.totalAmount || computedTotal,
    deliveryAddress: req.body.deliveryAddress,
    paymentMethod: req.body.paymentMethod
  });

  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  res.json(await Order.find({ userId: req.user.id }).populate("restaurantId", "name image"));
};

exports.getAllOrders = async (req, res) => {
  res.json(await Order.find());
};

exports.getRestaurantOrders = async (req, res) => {
  const Restaurant = require("../models/Restaurant");
  const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

  const orders = await Order.find({ restaurantId: restaurant._id }).populate("userId", "name phone");
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  res.json(await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }));
};