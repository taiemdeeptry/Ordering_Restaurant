const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { auth } = require("../middlewares/auth");

// Logging middleware
router.use((req, res, next) => {
    console.log("Dashboard route accessed:", req.method, req.url);
    next();
});

// Lấy thống kê dashboard
router.get("/stats", auth, dashboardController.getDashboardStats);

module.exports = router;
