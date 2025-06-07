const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { auth, authorize } = require("../middlewares/auth");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

// Validation middleware
const categoryValidation = [body("name").trim().notEmpty().withMessage("Tên danh mục là bắt buộc"), body("description").optional().trim(), body("image").optional().trim()];

// Routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", auth, authorize("admin"), categoryValidation, createCategory);
router.put("/:id", auth, authorize("admin"), categoryValidation, updateCategory);
router.delete("/:id", auth, authorize("admin"), deleteCategory);

module.exports = router;
