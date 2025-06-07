const Order = require("../models/Order");
const Table = require("../models/Table");
const Food = require("../models/Food");
const MenuItem = require("../models/MenuItem");

// Get all orders with table information
const getOrders = async (req, res) => {
    try {
        console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
        console.log("dit me may");
        console.log("Fetching orders...");
        const orders = await Order.find()
            .populate({
                path: "items.food",
                model: MenuItem,
                select: "name price",
            })
            .populate("table")
            .sort({ createdAt: -1 });

        console.log("Orders found:", orders.length);

        // Log chi tiết từng order
        orders.forEach((order, index) => {
            console.log(`\nOrder ${index + 1}:`);
            console.log("Order ID:", order._id);
            console.log("Table:", order.table?.number);
            console.log(
                "Items:",
                order.items.map((item) => ({
                    foodId: item.food?._id,
                    foodName: item.food?.name,
                    quantity: item.quantity,
                }))
            );
        });

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Get order by ID with table information
const getOrderById = async (req, res) => {
    try {
        console.log("full url", req.protocol + "://" + req.get("host") + req.originalUrl);
        const order = await Order.findById(req.params.id).populate("items.food").populate("table");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new order
const createOrder = async (req, res) => {
    try {
        const { items, table, note, total } = req.body;

        // Check if table exists and is available
        const tableExists = await Table.findById(table);
        if (!tableExists) {
            return res.status(404).json({ message: "Table not found" });
        }

        if (!tableExists.isAvailable) {
            return res.status(400).json({ message: "Table is not available" });
        }

        // Create the order
        const order = new Order({
            items,
            table,
            note,
            total,
            status: "pending",
        });

        // Update table status
        tableExists.isAvailable = false;
        tableExists.status = "occupied";
        await tableExists.save();

        // Save the order
        await order.save();

        // Populate the order with food and table details
        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: "items.food",
                model: MenuItem,
            })
            .populate("table");

        res.status(201).json(populatedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log("Updating order status for order ID:", id);
        console.log("New status:", status);

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
            .populate({
                path: "items.food",
                model: MenuItem,
                select: "name price",
            })
            .populate("table");

        if (!order) {
            console.log("Order not found:", id);
            return res.status(404).json({ message: "Order not found" });
        }

        console.log("Order status updated successfully:", {
            id: order._id.toString(),
            newStatus: order.status,
        });

        res.json(order);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("\n============================================");
        console.log("🔵 updatePaymentStatus - START");
        console.log("============================================");
        console.log("Order ID:", id);
        console.log("Request body:", JSON.stringify(req.body || {}));
        console.log("HTTP Method:", req.method);
        console.log("URL:", req.originalUrl);
        console.log("Auth header present:", req.headers.authorization ? "Yes" : "No");

        // Force set isPaid to true regardless of input
        const isPaid = true;

        try {
            // Tìm order theo ID
            const orderExists = await Order.findById(id);

            if (!orderExists) {
                console.log("❌ Order not found with ID:", id);
                return res.status(404).json({ message: "Order not found" });
            }

            console.log("✅ Found existing order:");
            console.log("  - ID:", orderExists._id.toString());
            console.log("  - Current isPaid:", orderExists.isPaid);
            console.log("  - Table ID:", orderExists.table ? orderExists.table.toString() : "null");

            // Nếu đã thanh toán rồi, trả về thành công luôn
            if (orderExists.isPaid) {
                console.log("ℹ️ Order already marked as paid - returning success");
                return res.status(200).json({
                    message: "Order already paid",
                    order: orderExists,
                });
            }

            // Cập nhật order
            console.log("⏩ Updating order isPaid to TRUE");

            const updatedOrder = await Order.findByIdAndUpdate(id, { isPaid: true }, { new: true });

            console.log("✅ Order updated successfully:");
            console.log("  - ID:", updatedOrder._id.toString());
            console.log("  - New isPaid:", updatedOrder.isPaid);

            // Nếu đơn hàng được thanh toán, cập nhật trạng thái bàn
            if (updatedOrder.table) {
                console.log("⏩ Updating associated table status");

                const table = await Table.findById(updatedOrder.table);
                if (table) {
                    console.log("Current table status:", {
                        id: table._id.toString(),
                        number: table.number,
                        status: table.status,
                        isAvailable: table.isAvailable,
                    });

                    // Cập nhật bàn thành available
                    table.isAvailable = true;
                    table.status = "available";
                    await table.save();

                    console.log("✅ Table updated:", {
                        id: table._id.toString(),
                        status: table.status,
                        isAvailable: table.isAvailable,
                    });
                } else {
                    console.log("⚠️ Table not found:", updatedOrder.table);
                }
            }

            // Populate lại order để trả về
            const finalOrder = await Order.findById(id)
                .populate({
                    path: "items.food",
                    model: MenuItem,
                    select: "name price",
                })
                .populate("table");

            console.log("============================================");
            console.log("🟢 updatePaymentStatus - COMPLETED SUCCESSFULLY");
            console.log("============================================");

            return res.status(200).json(finalOrder);
        } catch (dbError) {
            console.log("❌ Database error:", dbError.message);
            console.log(dbError.stack);
            return res.status(500).json({
                message: "Database error when updating payment status",
                error: dbError.message,
            });
        }
    } catch (error) {
        console.error("❌ Unexpected error in updatePaymentStatus:", error.message);
        console.error(error.stack);
        return res.status(500).json({
            message: "Server error when updating payment status",
            error: error.message,
        });
    }
};

// Cập nhật trạng thái thanh toán
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true }).populate("customer", "username email").populate("items.menuItem");

        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
};
