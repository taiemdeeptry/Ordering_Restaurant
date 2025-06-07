import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../context/CartContext";
import "./Menu.css";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/menu-items");
                const data = await response.json();
                setMenuItems(data);

                // Lấy danh sách các danh mục duy nhất từ database
                const uniqueCategories = [...new Set(data.map((item) => item.category.name))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = menuItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).filter((item) => item.isActive);

    // Nhóm món ăn theo danh mục
    const itemsByCategory = categories.reduce((acc, category) => {
        acc[category] = filteredItems.filter((item) => item.category.name === category);
        return acc;
    }, {});

    return (
        <div className="menu">
            <div className="menu__hero">
                <div className="menu__hero-overlay" />
                <Container>
                    <div className="menu__hero-content">
                        <Typography variant="h1" className="menu__hero-title">
                            Thực đơn
                        </Typography>
                        <Typography variant="h4" className="menu__hero-subtitle">
                            Khám phá hương vị độc đáo
                        </Typography>
                    </div>
                </Container>
            </div>

            <Container className="menu__container">
                <div className="menu__search-container">
                    <TextField
                        className="menu__search"
                        placeholder="Tìm kiếm món ăn..."
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div key={category} className="menu__category-section">
                        <Typography variant="h3" className="menu__category-title">
                            {category}
                        </Typography>
                        <Grid container spacing={4} className="menu__grid">
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item._id}>
                                    <Card className="menu__card">
                                        <CardMedia component="img" height="200" image={item.image} alt={item.name} className="menu__card-image" />
                                        <CardContent className="menu__card-content">
                                            <Typography variant="h6" className="menu__card-title">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" className="menu__card-description">
                                                {item.description}
                                            </Typography>
                                            <Box className="menu__card-footer">
                                                <Typography variant="h6" className="menu__card-price">
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </Typography>
                                                <Button variant="contained" className="menu__card-button" onClick={() => addToCart(item)}>
                                                    Thêm vào giỏ
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default Menu;
