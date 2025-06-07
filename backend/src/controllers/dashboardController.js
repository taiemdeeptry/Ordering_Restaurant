const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");

exports.getDashboardStats = async (req, res) => {
    try {
        console.log("Getting dashboard stats...");

        // Lấy tổng số đơn hàng
        const totalOrders = await Order.countDocuments();
        console.log("Total orders:", totalOrders);

        // Lấy tổng doanh thu từ các đơn hàng đã thanh toán
        const totalRevenue = await Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, total: { $sum: "$total" } } }]);
        console.log("Total revenue:", totalRevenue);

        // Tính giá trị trung bình của đơn hàng
        const averageOrderValue = totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0;
        console.log("Average order value:", averageOrderValue);

        // Lấy tổng số món ăn
        const totalMenuItems = await MenuItem.countDocuments();
        console.log("Total menu items:", totalMenuItems);

        // Lấy tổng số bàn và số bàn trống
        const totalTables = await Table.countDocuments();
        const availableTables = await Table.countDocuments({ status: "available" });
        console.log("Total tables:", totalTables, "Available tables:", availableTables);

        // Lấy 5 đơn hàng gần nhất
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate({
                path: "table",
                select: "number",
            })
            .select("table total createdAt status");
        console.log("Recent orders:", recentOrders);

        // Lấy 5 món ăn bán chạy nhất
        const topMenuItems = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.menuItem",
                    totalQuantity: { $sum: "$items.quantity" },
                },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "menuitems",
                    localField: "_id",
                    foreignField: "_id",
                    as: "menuItem",
                },
            },
            { $unwind: "$menuItem" },
            {
                $project: {
                    name: "$menuItem.name",
                    totalQuantity: 1,
                },
            },
        ]);
        console.log("Top menu items:", topMenuItems);

        const response = {
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            averageOrderValue,
            totalMenuItems,
            totalTables,
            availableTables,
            recentOrders,
            topMenuItems,
        };

        console.log("Sending response:", response);
        res.json(response);
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            message: "Error fetching dashboard statistics",
            error: error.message,
        });
    }
};
