const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const c = require("../controllers/orderController");

router.post("/", auth, c.placeOrder);
router.get("/user", auth, c.getUserOrders);
router.get("/restaurant-orders", auth, role("admin"), c.getRestaurantOrders);
router.get("/admin", auth, role("admin"), c.getAllOrders);
router.put("/:id/status", auth, role("admin"), c.updateStatus);

module.exports = router;