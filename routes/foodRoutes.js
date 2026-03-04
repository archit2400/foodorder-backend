const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const c = require("../controllers/foodController");

router.post("/:restaurantId", auth, role("admin"), c.createFood);
router.get("/my-restaurant", auth, role("admin"), c.getMyRestaurantFoods);
router.get("/:restaurantId", c.getByRestaurant);
router.put("/:id", auth, role("admin"), c.updateFood);
router.delete("/:id", auth, role("admin"), c.deleteFood);

module.exports = router;