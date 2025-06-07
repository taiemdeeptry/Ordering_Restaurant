import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from "@mui/material";
import { ShoppingCart, Restaurant } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import "./Header.css";

const Header = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleCartClick = () => {
        setDrawerOpen(true);
    };

    return (
        <AppBar position="static" className="header">
            <Toolbar className="header__toolbar">
                <Box className="header__logo-container" onClick={() => navigate("/")}>
                    <Restaurant className="header__logo-icon" />
                    <Typography variant="h5" component="div" className="header__logo-text">
                        Taste of Harmony
                    </Typography>
                </Box>

                <Box className="header__nav">
                    <Button color="inherit" className="header__nav-button" onClick={() => navigate("/")}>
                        Trang chủ
                    </Button>
                    <Button color="inherit" className="header__nav-button" onClick={() => navigate("/menu")}>
                        Thực đơn
                    </Button>
                    <Button
                        color="inherit"
                        className="header__cart-button"
                        startIcon={
                            <Badge badgeContent={cart.length} color="error" className="header__cart-badge">
                                <ShoppingCart />
                            </Badge>
                        }
                        onClick={handleCartClick}
                    >
                        Giỏ hàng
                    </Button>
                </Box>
            </Toolbar>
            <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </AppBar>
    );
};

export default Header;
