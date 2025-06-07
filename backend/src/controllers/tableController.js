const Table = require("../models/Table");

// Lấy tất cả bàn
const getAllTables = async (req, res) => {
    try {
        const { status, location } = req.query;
        const query = { isActive: true };

        if (status) query.status = status;
        if (location) query.location = location;

        const tables = await Table.find(query);
        res.json(tables);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy một bàn theo ID
const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn" });
        }
        res.json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Tạo bàn mới
const createTable = async (req, res) => {
    try {
        const { number, capacity, location } = req.body;
        const table = new Table({
            number,
            capacity,
            location,
        });
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Cập nhật thông tin bàn
const updateTable = async (req, res) => {
    try {
        const { number, capacity, status, location, isActive } = req.body;
        const table = await Table.findByIdAndUpdate(req.params.id, { number, capacity, status, location, isActive }, { new: true });
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn" });
        }
        res.json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Xóa bàn
const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn" });
        }
        res.json({ message: "Xóa bàn thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Cập nhật trạng thái bàn
const updateTableStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const table = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn" });
        }
        res.json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable,
    updateTableStatus,
};
