const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authenticate, authController.logout);
router.get("/session", authenticate, authController.session);
router.get("/me", authenticate, authController.me);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/otp", authController.otp);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
