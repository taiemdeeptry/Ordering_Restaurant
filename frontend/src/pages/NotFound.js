import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Trang không tồn tại
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/")} sx={{ mt: 2 }}>
                Về trang chủ
            </Button>
        </Box>
    );
};

export default NotFound;
