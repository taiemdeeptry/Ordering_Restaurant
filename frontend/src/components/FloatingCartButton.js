import React, { useState } from "react";
import { Fab, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const FloatingCartButton = () => {
    const { cart } = useCart();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="cart"
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                    backgroundColor: "#854442",
                    "&:hover": {
                        backgroundColor: "#be9b7b",
                    },
                }}
                onClick={handleDrawerOpen}
            >
                <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>
            <CartDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
        </>
    );
};

export default FloatingCartButton;
