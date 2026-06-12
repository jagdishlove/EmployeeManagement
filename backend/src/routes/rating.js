const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const { authenticate } = require("../middleware/auth");

router.get("/under-manager", authenticate, ratingController.underManager);
router.post("/save", authenticate, ratingController.save);
router.get("/by-manager", authenticate, ratingController.byManager);

module.exports = router;
