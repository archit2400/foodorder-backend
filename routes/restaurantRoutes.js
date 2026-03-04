const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const c = require("../controllers/restaurantController");

router.post("/", auth, role("admin"), c.createRestaurant);
router.get("/my-restaurant", auth, role("admin"), c.getMyRestaurant);
router.get("/", c.getRestaurants);
router.get("/:id", c.getRestaurant);
router.put("/:id", auth, role("admin"), c.updateRestaurant);
router.delete("/:id", auth, role("admin"), c.deleteRestaurant);

module.exports = router;