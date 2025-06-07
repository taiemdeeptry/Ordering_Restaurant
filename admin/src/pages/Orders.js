import React, { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

    // Tạo instance axios với cấu hình đầy đủ
    const api = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Interceptor để thêm token vào mỗi request
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            console.log("Raw orders data:", response.data);

            const ordersWithItems = response.data.map((order) => {
                console.log("Processing order:", order._id);
                console.log("Order items:", order.items);

                return {
                    ...order,
                    items: order.items.map((item) => {
                        console.log("Processing item:", item._id);
                        console.log("Item food:", item.food);

                        if (!item.food) {
                            console.warn("Food is missing for item:", item._id);
                            return {
                                ...item,
                                food: { name: "Món không xác định" },
                            };
                        }

                        return item;
                    }),
                };
            });

            setOrders(ordersWithItems);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Không thể tải danh sách đơn hàng");
            setLoading(false);
            showNotification("Không thể tải danh sách đơn hàng", "error");
        }
    };

    const handlePaymentStatus = async (orderId) => {
        try {
            console.log(`===== UPDATE PAYMENT STATUS =====`);
            console.log(`Order ID: ${orderId}`);
            console.log(`API URL: ${API_URL}/orders/${orderId}/payment`);

            // Kiểm tra token
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token không tồn tại");
                showNotification("Bạn cần đăng nhập lại để thực hiện thao tác này", "error");
                return false;
            }

            console.log(`Token available: ${token ? "Yes" : "No"}`);

            // Gửi request trực tiếp, dùng PUT thay vì PATCH vì CORS
            try {
                const response = await axios.put(
                    `${API_URL}/orders/${orderId}/payment`,
                    { isPaid: true },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Response success:", response.data);
                showNotification("Cập nhật trạng thái thanh toán thành công", "success");
                await fetchOrders(); // Refresh orders list
                return true;
            } catch (error) {
                console.error("Error details:", error);
                if (error.response) {
                    console.error("Status code:", error.response.status);
                    console.error("Response data:", error.response.data);
                }
                showNotification("Không thể cập nhật trạng thái thanh toán", "error");
                return false;
            }
        } catch (error) {
            console.error("General error:", error);
            showNotification("Đã xảy ra lỗi", "error");
            return false;
        }
    };

    const showNotification = (message, severity) => {
        setNotification({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const formatPrice = (price) => {
        if (price === undefined || price === null) return "0đ";
        return `${price.toLocaleString()}đ`;
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Quản lý đơn hàng
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Thời gian đặt</TableCell>
                            <TableCell>Bàn</TableCell>
                            <TableCell>Món ăn</TableCell>
                            <TableCell>Ghi chú</TableCell>
                            <TableCell>Tổng tiền</TableCell>
                            <TableCell>Trạng thái thanh toán</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                                <TableCell>Bàn {order.table?.number || "N/A"}</TableCell>
                                <TableCell>
                                    {order.items?.map((item) => (
                                        <Box key={item._id} sx={{ mb: 1 }}>
                                            <Typography>
                                                {item.food?.name || "Món không xác định"} x {item.quantity || 0}
                                            </Typography>
                                        </Box>
                                    ))}
                                </TableCell>
                                <TableCell>{order.note || "Không có ghi chú"}</TableCell>
                                <TableCell>{formatPrice(order.total)}</TableCell>
                                <TableCell>
                                    {order.isPaid ? <Chip icon={<CheckCircle />} label="Đã thanh toán" color="success" /> : <Chip icon={<Cancel />} label="Chưa thanh toán" color="error" />}
                                </TableCell>
                                <TableCell>
                                    {!order.isPaid && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => {
                                                console.log("Button clicked for order:", order._id);
                                                handlePaymentStatus(order._id);
                                            }}
                                        >
                                            Đánh dấu đã thanh toán
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Orders;
