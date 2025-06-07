import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Chip,
    Badge,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const MenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        discount: 0,
        isActive: true,
    });

    // API endpoint
    const API_URL = "http://localhost:5000/api";

    // Fetch menu items
    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/menu-items`);
            setMenuItems(response.data);
            setError(null);
        } catch (err) {
            setError("Không thể tải danh sách món ăn. Vui lòng thử lại sau.");
            console.error("Error fetching menu items:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    // Create new menu item
    const createMenuItem = async (data) => {
        try {
            const menuItemData = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: data.category,
                image: data.image,
                discount: parseFloat(data.discount),
                isActive: data.isActive,
            };

            const response = await axios.post(`${API_URL}/menu-items`, menuItemData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data) {
                setMenuItems((prevItems) => [...prevItems, response.data]);
                return true;
            }
            return false;
        } catch (err) {
            setError("Không thể tạo món ăn mới. Vui lòng thử lại sau.");
            console.error("Error creating menu item:", err);
            return false;
        }
    };

    // Update menu item
    const updateMenuItem = async (id, data) => {
        try {
            const menuItemData = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: data.category,
                image: data.image,
                discount: parseFloat(data.discount),
                isActive: data.isActive,
            };

            const response = await axios.put(`${API_URL}/menu-items/${id}`, menuItemData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data) {
                setMenuItems((prevItems) => prevItems.map((item) => (item._id === id ? response.data : item)));
                return true;
            }
            return false;
        } catch (err) {
            setError("Không thể cập nhật món ăn. Vui lòng thử lại sau.");
            console.error("Error updating menu item:", err);
            return false;
        }
    };

    // Delete menu item
    const deleteMenuItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/menu-items/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
            return true;
        } catch (err) {
            setError("Không thể xóa món ăn. Vui lòng thử lại sau.");
            console.error("Error deleting menu item:", err);
            return false;
        }
    };

    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
    }, []);

    const handleOpenDialog = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description,
                price: item.price.toString(),
                image: item.image,
                category: item.category._id,
                discount: item.discount.toString(),
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                description: "",
                price: "",
                image: "",
                category: "",
                discount: "0",
                isActive: true,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
            discount: "0",
            isActive: true,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await updateMenuItem(editingItem._id, formData);
            } else {
                await createMenuItem(formData);
            }
            handleCloseDialog();
        } catch (err) {
            setError("Không thể lưu dữ liệu. Vui lòng thử lại sau.");
            console.error("Error saving menu item:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này?")) {
            await deleteMenuItem(id);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">Quản lý Menu</Typography>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                    Thêm món mới
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                        <Card>
                            <CardMedia component="img" height="200" image={item.image} alt={item.name} />
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <Box>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.category?.name || "Uncategorized"}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Tooltip title={item.isActive ? "Đang bán" : "Ngừng bán"}>
                                            <Badge color={item.isActive ? "success" : "error"} variant="dot" sx={{ mr: 1 }}>
                                                {item.isActive ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                            </Badge>
                                        </Tooltip>
                                        <IconButton onClick={() => handleOpenDialog(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {item.description}
                                </Typography>
                                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="h6" color="primary">
                                        {item.discount > 0 ? (
                                            <>
                                                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>${item.price.toFixed(2)}</span>$
                                                {(item.price * (1 - item.discount / 100)).toFixed(2)}
                                            </>
                                        ) : (
                                            // `${item.price.toFixed(0)}đ`
                                            `${item.price.toLocaleString("vi-VN")}đ`
                                        )}
                                    </Typography>
                                    {item.discount > 0 && <Chip label={`${item.discount}% OFF`} color="primary" size="small" />}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingItem ? "Chỉnh sửa món ăn" : "Thêm món mới"}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Tên món" name="name" value={formData.name} onChange={handleInputChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Mô tả" name="description" value={formData.description} onChange={handleInputChange} multiline rows={3} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Giá" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="URL hình ảnh" name="image" value={formData.image} onChange={handleInputChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel>Danh mục</InputLabel>
                                    <Select name="category" value={formData.category} onChange={handleInputChange} label="Danh mục">
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Giảm giá (%)" name="discount" type="number" value={formData.discount} onChange={handleInputChange} inputProps={{ min: 0, max: 100 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleInputChange} name="isActive" />} label="Hiển thị" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Hủy</Button>
                        <Button type="submit" variant="contained">
                            {editingItem ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default MenuItems;
