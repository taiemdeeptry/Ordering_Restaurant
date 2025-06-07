import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Dashboard as DashboardIcon, Category as CategoryIcon, Restaurant as RestaurantIcon, Logout as LogoutIcon } from "@mui/icons-material";

const drawerWidth = 240;

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Danh mục", icon: <CategoryIcon />, path: "/categories" },
        { text: "Món ăn", icon: <RestaurantIcon />, path: "/menu-items" },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            if (isMobile) setMobileOpen(false);
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem
                    button
                    onClick={() => {
                        // Handle logout
                        navigate("/login");
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đăng xuất" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Restaurant Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
