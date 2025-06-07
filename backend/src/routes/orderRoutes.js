const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Log all incoming requests to debug
router.use((req, res, next) => {
    console.log(`💡 [orderRoutes] ${req.method} ${req.originalUrl}`);
    next();
});

// GET all orders
router.get("/", orderController.getOrders);

// GET order by ID
router.get("/:id", orderController.getOrderById);

// POST create new order
router.post("/", orderController.createOrder);

// PATCH update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// GET payment info (debug route)
router.get("/:id/payment", async (req, res) => {
    console.log("✅ GET payment route hit");
    console.log("ID:", req.params.id);

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            message: "Use PUT to update payment status",
            order: {
                id: order._id,
                isPaid: order.isPaid,
            },
        });
    } catch (error) {
        console.error("❌ Error in GET payment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// PUT update payment status (explicit handler)
// router.put("/:id/payment", (req, res) => {
//     console.log("✅ PUT payment route hit");
//     console.log("ID:", req.params.id);
//     console.log("Body:", req.body);
//     console.log("Has auth:", req.headers.authorization ? "Yes" : "No");

//     // Call controller directly
//     try {
//         orderController.updatePaymentStatus(req, res);
//     } catch (error) {
//         console.error("❌ Error in PUT payment:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// PATCH update payment status (alternative)
router.patch("/:id/payment", (req, res) => {
    console.log("✅ PATCH payment route hit");
    console.log("ID:", req.params.id);
    console.log("Body:", req.body);

    try {
        orderController.updatePaymentStatus(req, res);
    } catch (error) {
        console.error("❌ Error in PATCH payment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// POST update payment status (alternative)
router.post("/:id/payment", (req, res) => {
    console.log("✅ POST payment route hit");
    console.log("ID:", req.params.id);
    console.log("Body:", req.body);

    try {
        orderController.updatePaymentStatus(req, res);
    } catch (error) {
        console.error("❌ Error in POST payment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
