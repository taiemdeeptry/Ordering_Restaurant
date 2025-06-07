const express = require("express");
const { getOrders, getOrderById, createOrder, updateOrderStatus, updatePaymentStatus } = require("../controllers/orderController");
const { auth } = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Get all orders (admin only)
router.get("/", auth, getOrders);

// Get order by ID
router.get("/:id", auth, getOrderById);

// Create new order (no auth required)
router.post("/", createOrder);

// Update order status (admin only)
router.patch("/:orderId/status", auth, updateOrderStatus);

// Update payment status
router.patch("/:orderId/payment", auth, updatePaymentStatus);
// PUT update payment status (explicit handler)
router.put("/:id/payment", auth, (req, res) => {
    console.log("✅ PUT payment route hit");
    console.log("ID:", req.params.id);
    console.log("Body:", req.body);
    console.log("Has auth:", req.headers.authorization ? "Yes" : "No");
    // Call controller directly
    try {
        orderController.updatePaymentStatus(req, res);
    } catch (error) {
        console.error("❌ Error in PUT payment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
