import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import axios from "axios";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tables");
            setTables(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tables:", error);
            setLoading(false);
        }
    };

    const getTableStatus = (table) => {
        if (!table.isAvailable) {
            return {
                icon: <PersonOffIcon color="error" />,
                text: "Đã đặt",
                color: "error.light",
            };
        }
        return {
            icon: <PeopleIcon color="success" />,
            text: "Còn trống",
            color: "success.light",
        };
    };

    if (loading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Quản lý bàn
            </Typography>
            <Grid container spacing={3}>
                {tables.map((table) => {
                    const status = getTableStatus(table);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={table._id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: status.color,
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="h5" component="h2">
                                            Bàn {table.number}
                                        </Typography>
                                        <Tooltip title={status.text}>
                                            <IconButton>{status.icon}</IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Typography color="text.secondary">Sức chứa: {table.capacity} người</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Tables;
