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
                p: 3,
            }}
        >
            <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Trang không tồn tại
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")} sx={{ px: 4, py: 1.5 }}>
                Về trang chủ
            </Button>
        </Box>
    );
};

export default NotFound;
