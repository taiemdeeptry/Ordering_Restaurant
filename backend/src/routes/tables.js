const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { auth, authorize } = require("../middlewares/auth");
const { getAllTables, getTableById, createTable, updateTable, deleteTable, updateTableStatus } = require("../controllers/tableController");

// Validation middleware
const tableValidation = [
    body("number").isInt({ min: 1 }).withMessage("Số bàn phải lớn hơn 0"),
    body("capacity").isInt({ min: 1 }).withMessage("Sức chứa phải lớn hơn 0"),
    body("location").isIn(["indoor", "outdoor", "bar"]).withMessage("Vị trí không hợp lệ"),
];

const statusValidation = [body("status").isIn(["available", "occupied", "reserved", "maintenance"]).withMessage("Trạng thái không hợp lệ")];

// Routes
router.get("/", getAllTables);
router.get("/:id", getTableById);
router.post("/", auth, authorize("admin"), tableValidation, createTable);
router.put("/:id", auth, authorize("admin"), tableValidation, updateTable);
router.delete("/:id", auth, authorize("admin"), deleteTable);
router.put("/:id/status", auth, authorize("admin", "staff"), statusValidation, updateTableStatus);

module.exports = router;
