import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, CardContent, Typography, Box } from "@mui/material";

const TableSelection = ({ open, onClose, onSelect }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tables");
                if (!response.ok) {
                    throw new Error("Failed to fetch tables");
                }
                const data = await response.json();
                setTables(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (open) {
            fetchTables();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Chọn bàn</DialogTitle>
            <DialogContent>
                {loading ? (
                    <Typography>Đang tải...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {tables.map((table) => (
                            <Grid item xs={12} sm={6} md={4} key={table._id}>
                                <Card
                                    onClick={() => onSelect(table)}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Bàn {table.number}
                                        </Typography>
                                        <Typography color="text.secondary">Sức chứa: {table.capacity} người</Typography>
                                        <Typography color={table.isAvailable ? "success.main" : "error.main"}>{table.isAvailable ? "Có sẵn" : "Đã đặt"}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TableSelection;
