const Category = require("../models/Category");

// Lấy tất cả danh mục
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy một danh mục theo ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Tạo danh mục mới
const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const category = new Category({
            name,
            description,
            image,
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name, description, image, isActive }, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        res.json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
