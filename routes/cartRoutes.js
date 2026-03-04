const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const c = require("../controllers/cartController");

router.post("/add", auth, c.addToCart);
router.get("/", auth, c.getCart);
router.delete("/remove/:foodId", auth, c.removeItem);

module.exports = router;