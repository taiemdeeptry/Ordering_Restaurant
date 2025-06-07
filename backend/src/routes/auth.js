const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, getCurrentUser } = require("../controllers/authController");
const { auth } = require("../middlewares/auth");

// Validation middleware
const registerValidation = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [body("email").isEmail().withMessage("Please enter a valid email"), body("password").notEmpty().withMessage("Password is required")];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", auth, getCurrentUser);

module.exports = router;
