const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { auth, authorize } = require("../middlewares/auth");
const { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } = require("../controllers/menuItemController");
const MenuItem = require("../models/MenuItem");

// Validation middleware
const menuItemValidation = [
    body("name").trim().notEmpty().withMessage("Tên món ăn là bắt buộc"),
    body("price").isFloat({ min: 0 }).withMessage("Giá phải là số dương"),
    body("category").isMongoId().withMessage("Danh mục không hợp lệ"),
    body("description").optional().trim(),
    body("image").optional().trim(),
    body("discount").optional().isFloat({ min: 0, max: 100 }),
    body("isActive").optional().isBoolean(),
];

// Routes
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", auth, authorize("admin"), menuItemValidation, createMenuItem);
router.put("/:id", auth, authorize("admin"), menuItemValidation, updateMenuItem);
router.delete("/:id", auth, authorize("admin"), deleteMenuItem);

// Route để tạo dữ liệu mẫu (chỉ dùng cho testing)
router.post("/sample-data", async (req, res) => {
    try {
        const sampleItems = [
            {
                name: "Pizza Margherita",
                description: "Classic pizza with tomato sauce, mozzarella, and basil",
                price: 12.99,
                category: "65f9d3b1a1b2c3d4e5f6g7h8", // Thay thế bằng ID danh mục thực tế
                image: "https://via.placeholder.com/300x200",
                discount: 10,
                isActive: true,
            },
            {
                name: "Spaghetti Carbonara",
                description: "Pasta with eggs, cheese, pancetta, and black pepper",
                price: 14.99,
                category: "65f9d3b1a1b2c3d4e5f6g7h8", // Thay thế bằng ID danh mục thực tế
                image: "https://via.placeholder.com/300x200",
                discount: 0,
                isActive: true,
            },
            {
                name: "Caesar Salad",
                description: "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
                price: 9.99,
                category: "65f9d3b1a1b2c3d4e5f6g7h8", // Thay thế bằng ID danh mục thực tế
                image: "https://via.placeholder.com/300x200",
                discount: 5,
                isActive: true,
            },
        ];

        const createdItems = await MenuItem.insertMany(sampleItems);
        res.status(201).json(createdItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

module.exports = router;
