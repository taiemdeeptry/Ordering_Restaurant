const MenuItem = require("../models/MenuItem");

// Lấy tất cả món ăn
const getAllMenuItems = async (req, res) => {
    try {
        const { category, isActive } = req.query;
        const query = {};

        if (category) query.category = category;
        if (isActive !== undefined) query.isActive = isActive;

        const menuItems = await MenuItem.find(query)
            .populate({
                path: "category",
                select: "name _id", // Chỉ lấy name và _id của category
            })
            .lean(); // Chuyển đổi thành plain object để dễ xử lý

        // Xử lý trường hợp category là null
        const processedMenuItems = menuItems.map((item) => ({
            ...item,
            category: item.category || { name: "Uncategorized", _id: null },
        }));

        res.json(processedMenuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy một món ăn theo ID
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id).populate("category");
        if (!menuItem) {
            return res.status(404).json({ message: "Không tìm thấy món ăn" });
        }
        res.json(menuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Tạo món ăn mới
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, discount, isActive } = req.body;

        const menuItem = new MenuItem({
            name,
            description,
            price,
            category,
            image,
            discount,
            isActive,
        });

        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Cập nhật món ăn
const updateMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, discount, isActive } = req.body;

        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                image,
                discount,
                isActive,
            },
            { new: true }
        ).populate("category");

        if (!menuItem) {
            return res.status(404).json({ message: "Không tìm thấy món ăn" });
        }
        res.json(menuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Xóa món ăn (soft delete)
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!menuItem) {
            return res.status(404).json({ message: "Không tìm thấy món ăn" });
        }
        res.json({ message: "Xóa món ăn thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy món ăn theo danh mục
const getMenuItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const menuItems = await MenuItem.find({ category: categoryId, isActive: true }).populate("category");
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy món ăn đặc biệt
const getSpecialMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ isSpecial: true, isActive: true }).populate("category");
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy món ăn có sẵn
const getAvailableMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ isAvailable: true, isActive: true }).populate("category");
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemsByCategory,
    getSpecialMenuItems,
    getAvailableMenuItems,
};
