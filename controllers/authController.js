const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const token = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const userRole = role === "admin" ? "admin" : "user";
    const user = await User.create({ name, email, password: hash, role: userRole });

    
    if (userRole === "admin") {
      const Restaurant = require("../models/Restaurant");
      await Restaurant.create({
        name: `${name}'s Restaurant`,
        ownerId: user._id,
        isActive: true,
      });
    }

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: token(user), user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};