import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText, Divider } from "@mui/material";
import api from "../utils/api";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            console.log("Fetching dashboard data...");
            const token = localStorage.getItem("token");
            console.log("Current token:", token);

            const response = await api.get("/dashboard/stats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Dashboard response:", response.data);
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config,
            });
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Total Revenue */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Revenue
                            </Typography>
                            <Typography variant="h5">
                                {stats?.totalRevenue?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Orders */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Orders
                            </Typography>
                            <Typography variant="h5">{stats?.totalOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Average Order Value */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Average Order Value
                            </Typography>
                            <Typography variant="h5">
                                {stats?.averageOrderValue?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Available Tables */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Available Tables
                            </Typography>
                            <Typography variant="h5">
                                {stats?.availableTables} / {stats?.totalTables}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Orders
                            </Typography>
                            <List>
                                {stats?.recentOrders?.map((order) => (
                                    <React.Fragment key={order._id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Bàn ${order.table?.number}`}
                                                secondary={`${order.total.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })} - ${new Date(order.createdAt).toLocaleString("vi-VN", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Menu Items */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Top Menu Items
                            </Typography>
                            <List>
                                {stats?.topMenuItems?.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <ListItem>
                                            <ListItemText primary={item.name} secondary={`Quantity: ${item.totalQuantity}`} />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
