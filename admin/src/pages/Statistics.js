import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import axios from "axios";

const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        popularItems: [],
        dailyRevenue: [],
    });

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get("/api/statistics");
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Thống kê
            </Typography>

            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Tổng số đơn hàng</Typography>
                        <Typography variant="h4">{stats.totalOrders}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Tổng doanh thu</Typography>
                        <Typography variant="h4">{stats.totalRevenue?.toLocaleString()}đ</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Giá trị đơn hàng trung bình</Typography>
                        <Typography variant="h4">{stats.averageOrderValue?.toLocaleString()}đ</Typography>
                    </Paper>
                </Grid>

                {/* Popular Items Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Món ăn phổ biến
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.popularItems}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="quantity" fill="#8884d8" name="Số lượng" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Daily Revenue Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Doanh thu theo ngày
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats.dailyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Doanh thu" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
