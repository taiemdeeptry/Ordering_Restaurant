import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Divider, TextField, Chip, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import TableSelection from "./TableSelection";
import axios from "axios";
import { useTable } from "../context/TableContext";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Close, Add, Remove } from "@mui/icons-material";

const CartDrawer = ({ open, onClose }) => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const { selectedTable, setSelectedTable } = useTable();
    const [isTableSelectionOpen, setIsTableSelectionOpen] = useState(false);
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCheckout = async () => {
        if (!selectedTable) {
            setError("Vui lòng chọn bàn trước khi thanh toán");
            return;
        }

        try {
            const orderData = {
                items: cart.map((item) => ({
                    food: item._id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                table: selectedTable._id,
                note: note,
                total: getTotalPrice(),
            };

            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();
            setSuccess("Đặt hàng thành công!");
            clearCart();
            setSelectedTable(null);
            setNote("");
            onClose();
        } catch (error) {
            console.error("Error creating order:", error);
            setError("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
        }
    };

    const handleCloseSnackbar = () => {
        setError("");
        setSuccess("");
    };

    return (
        <>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box sx={{ width: 350, p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Giỏ hàng</Typography>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    {cart.length === 0 ? (
                        <Typography>Giỏ hàng trống</Typography>
                    ) : (
                        <>
                            <List>
                                {cart.map((item) => (
                                    <ListItem key={item._id} divider>
                                        <ListItemText primary={item.name} secondary={`${item.price.toLocaleString()}đ x ${item.quantity}`} />
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <IconButton size="small" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                                                <Remove />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton size="small" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                                <Add />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => removeFromCart(item._id)}>
                                                <Close />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Bàn đã chọn:
                                    </Typography>
                                    {selectedTable ? (
                                        <Chip label={`Bàn ${selectedTable.number} (${selectedTable.capacity} người)`} onDelete={() => setSelectedTable(null)} color="primary" />
                                    ) : (
                                        <Button variant="outlined" fullWidth onClick={() => setIsTableSelectionOpen(true)}>
                                            Chọn bàn
                                        </Button>
                                    )}
                                </Box>
                                <Typography variant="h6">Tổng: {getTotalPrice().toLocaleString()}đ</Typography>
                                <TextField fullWidth label="Ghi chú" value={note} onChange={(e) => setNote(e.target.value)} sx={{ mt: 2 }} />
                                <Button fullWidth variant="contained" color="primary" onClick={handleCheckout} disabled={!selectedTable} sx={{ mt: 2 }}>
                                    Thanh toán
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
            <TableSelection
                open={isTableSelectionOpen}
                onClose={() => setIsTableSelectionOpen(false)}
                onSelect={(table) => {
                    setSelectedTable(table);
                    setIsTableSelectionOpen(false);
                }}
            />
            <Snackbar open={!!error || !!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
                    {error || success}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CartDrawer;
