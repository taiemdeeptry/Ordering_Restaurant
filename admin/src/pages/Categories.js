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
    Snackbar,
    Chip,
    Stack,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        isActive: true,
    });
    const [editingId, setEditingId] = useState(null);
    const [success, setSuccess] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Tạo instance axios với cấu hình đầy đủ
    const api = axios.create({
        baseURL: "http://localhost:5000/api",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Interceptor để thêm token vào mỗi request
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Interceptor để xử lý lỗi response
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Xóa token và chuyển hướng về trang login
                localStorage.removeItem("token");
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        // Kiểm tra token khi component mount
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get("/categories");
            setCategories(response.data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Please login to continue");
            } else {
                setError("Error fetching categories");
                console.error("Error fetching categories:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        setEditingId(null);
        setFormData({
            name: "",
            description: "",
            image: "",
            isActive: true,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        setFormData({
            name: "",
            description: "",
            image: "",
            isActive: true,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/categories/${editingId}`, formData);
                setSuccess("Category updated successfully");
            } else {
                await api.post("/categories", formData);
                setSuccess("Category created successfully");
            }
            handleClose();
            fetchCategories();
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Please login to continue");
            } else {
                setError(err.response?.data?.message || "Error saving category");
                console.error("Error saving category:", err);
            }
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            description: category.description,
            image: category.image,
            isActive: category.isActive,
        });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await api.delete(`/categories/${id}`);
                setSuccess("Category deleted successfully");
                fetchCategories();
            } catch (err) {
                setError(err.response?.data?.message || "Error deleting category");
                console.error("Error deleting category:", err);
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Categories
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                    Add Category
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category._id}>
                        <Card>
                            <CardMedia component="img" height="140" image={category.image || "https://via.placeholder.com/300x200"} alt={category.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {category.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {category.description}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <Chip label={category.isActive ? "Active" : "Inactive"} color={category.isActive ? "success" : "error"} size="small" />
                                </Stack>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <IconButton color="primary" onClick={() => handleEdit(category)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(category._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? "Edit Category" : "Add New Category"}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="name" label="Category Name" type="text" fullWidth variant="outlined" value={formData.name} onChange={handleChange} required />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <TextField margin="dense" name="image" label="Image URL" type="text" fullWidth variant="outlined" value={formData.image} onChange={handleChange} required />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editingId ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: "100%" }}>
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Categories;
