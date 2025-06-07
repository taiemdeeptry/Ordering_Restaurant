import React, { useState } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Chip, Alert, Snackbar } from "@mui/material";

const OrderStatus = () => {
    const [order] = useState({
        _id: "ORD001",
        tableNumber: "Bàn 1",
        items: [
            { name: "Phở Bò", quantity: 2, price: 45000, status: "pending" },
            { name: "Bánh Mì Thịt", quantity: 1, price: 25000, status: "cancelled" },
            { name: "Trà Đào", quantity: 2, price: 20000, status: "completed" },
        ],
        totalAmount: 110000,
        status: "processing",
    });

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Món Bánh Mì Thịt đã bị hủy do hết nguyên liệu",
            severity: "error",
            timestamp: "2024-03-20T14:30:00Z",
        },
        {
            id: 2,
            message: "Món Trà Đào đã được phục vụ",
            severity: "success",
            timestamp: "2024-03-20T14:25:00Z",
        },
    ]);

    const [openNotification, setOpenNotification] = useState(true);

    const getItemStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "completed":
                return "success";
            case "cancelled":
                return "error";
            default:
                return "default";
        }
    };

    const getItemStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Đang chờ";
            case "completed":
                return "Đã phục vụ";
            case "cancelled":
                return "Đã hủy";
            default:
                return status;
        }
    };

    const getOrderStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "processing":
                return "info";
            case "completed":
                return "success";
            case "cancelled":
                return "error";
            default:
                return "default";
        }
    };

    const getOrderStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Đang chờ xử lý";
            case "processing":
                return "Đang chuẩn bị";
            case "completed":
                return "Hoàn thành";
            case "cancelled":
                return "Đã hủy";
            default:
                return status;
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Trạng thái đơn hàng
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Bàn {order.tableNumber}</Typography>
                    <Chip label={getOrderStatusText(order.status)} color={getOrderStatusColor(order.status)} />
                </Box>

                <List>
                    {order.items.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText primary={item.name} secondary={`${item.quantity} x ${item.price.toLocaleString()}đ`} />
                                <Chip label={getItemStatusText(item.status)} color={getItemStatusColor(item.status)} />
                            </ListItem>
                            {index < order.items.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>

                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Typography variant="h6">Tổng tiền: {order.totalAmount.toLocaleString()}đ</Typography>
                </Box>
            </Paper>

            <Typography variant="h5" gutterBottom>
                Thông báo
            </Typography>

            <List>
                {notifications.map((notification) => (
                    <ListItem key={notification.id}>
                        <Alert severity={notification.severity} sx={{ width: "100%" }}>
                            {notification.message}
                            <Typography variant="caption" display="block">
                                {new Date(notification.timestamp).toLocaleString()}
                            </Typography>
                        </Alert>
                    </ListItem>
                ))}
            </List>

            <Snackbar open={openNotification} autoHideDuration={6000} onClose={() => setOpenNotification(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpenNotification(false)} severity="info" sx={{ width: "100%" }}>
                    Bạn có thể theo dõi trạng thái đơn hàng tại đây
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OrderStatus;
