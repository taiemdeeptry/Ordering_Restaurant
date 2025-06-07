import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTable } from "../../context/TableContext";
import TableSelection from "../TableSelection";

const Layout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { selectedTable, setSelectedTable } = useTable();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTableSelect = (table) => {
        setSelectedTable(table);
        handleMenuClose();
    };

    const handleNavigation = (path) => {
        if (!selectedTable) {
            alert("Vui lòng chọn bàn trước khi tiếp tục!");
            return;
        }
        navigate(path);
    };

    const drawer = (
        <Box>
            <List>
                <ListItem button onClick={() => handleNavigation("/")}>
                    <ListItemText primary="Trang chủ" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/menu")}>
                    <ListItemText primary="Thực đơn" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/orders")}>
                    <ListItemText primary="Đơn hàng" />
                </ListItem>
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Chọn bàn
                </Typography>
                <TableSelection />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: "bold",
                        }}
                    >
                        Nhà hàng
                    </Typography>
                    {!isMobile && (
                        <>
                            <Button color="inherit" onClick={() => handleNavigation("/")}>
                                Trang chủ
                            </Button>
                            <Button color="inherit" onClick={() => handleNavigation("/menu")}>
                                Thực đơn
                            </Button>
                            <Button color="inherit" onClick={() => handleNavigation("/orders")}>
                                Đơn hàng
                            </Button>
                            <Button color="inherit" onClick={handleMenuClick} sx={{ ml: 2 }}>
                                {selectedTable ? `Bàn ${selectedTable.number} (${selectedTable.capacity} người)` : "Chọn bàn"}
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 240,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        minWidth: 200,
                        maxHeight: 400,
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <TableSelection />
                </Box>
            </Menu>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
