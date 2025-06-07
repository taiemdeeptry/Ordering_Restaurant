# Hệ Thống Đặt Món Nhà Hàng

Hệ thống đặt món nhà hàng với các tính năng:

-   Xem danh sách món ăn
-   Thêm món vào giỏ hàng
-   Chỉnh sửa món ăn trong giỏ hàng
-   Chọn bàn
-   Quản lý đơn hàng
-   Thêm, chỉnh sửa, xóa, ẩn các món ăn, danh mục món ăn
-   Quản lý các hóa đơn

## Yêu cầu hệ thống

-   Node.js (v14 trở lên)
-   MongoDB (v4.4 trở lên)
-   npm hoặc yarn

## Cài đặt

### Backend

1. Cài đặt dependencies:

```bash
cd backend
npm install
```

2. Chạy server:

```bash
npm run dev
```

### Frontend

1. Cài đặt dependencies:

```bash
cd frontend
npm install
```

2. Chạy ứng dụng:

```bash
npm start
```

### Admin

1. Cài đặt dependencies:

```bash
cd admin
npm install
```

2. Chạy ứng dụng:

```bash
npm start
```

## Cấu trúc thư mục

```
restaurant-ordering-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    ├── .env
    └── package.json
```

## API Endpoints

### Authentication

-   POST /api/auth/register - Đăng ký tài khoản
-   POST /api/auth/login - Đăng nhập
-   POST /api/auth/refreshtoken - Gia hạn access token
-   POST /api/auth/logout - Đăng xuất
-   GET /api/auth/me - Lấy thông tin user hiện tại

### Categories

-   GET /api/categories - Lấy danh sách danh mục
-   GET /api/categories/:id - Lấy thông tin danh mục
-   POST /api/categories - Tạo danh mục mới (Admin)
-   PUT /api/categories/:id - Cập nhật danh mục (Admin)
-   DELETE /api/categories/:id - Xóa danh mục (Admin)

### Menu Items

-   GET /api/menu-items - Lấy danh sách món ăn
-   GET /api/menu-items/:id - Lấy thông tin món ăn
-   POST /api/menu-items - Thêm món ăn mới (Admin)
-   PUT /api/menu-items/:id - Cập nhật món ăn (Admin)
-   DELETE /api/menu-items/:id - Xóa món ăn (Admin)

### Orders

-   POST /api/orders - Tạo đơn hàng mới
-   GET /api/orders - Lấy danh sách đơn hàng
-   GET /api/orders/:id - Lấy thông tin đơn hàng
-   PUT /api/orders/:id - Cập nhật trạng thái đơn hàng
-   DELETE /api/orders/:id - Hủy đơn hàng

### Tables

-   GET /api/tables - Lấy danh sách bàn
-   GET /api/tables/:id - Lấy thông tin bàn
-   POST /api/tables - Thêm bàn mới (Admin)
-   PUT /api/tables/:id - Cập nhật thông tin bàn (Admin)
-   DELETE /api/tables/:id - Xóa bàn (Admin)

### Users

-   GET /api/users - Lấy danh sách người dùng (Admin)
-   GET /api/users/:id - Lấy thông tin người dùng
-   PUT /api/users/:id - Cập nhật thông tin người dùng
-   DELETE /api/users/:id - Xóa người dùng (Admin)

### Statistics

-   GET /api/statistics/revenue - Thống kê doanh thu (Admin)
-   GET /api/statistics/orders - Thống kê đơn hàng (Admin)
-   GET /api/statistics/menu-items - Thống kê món ăn (Admin)

Lưu ý:

-   Các endpoint có đánh dấu (Admin) yêu cầu quyền admin
-   Tất cả các endpoint (trừ /api/auth/register và /api/auth/login) đều yêu cầu xác thực JWT
-   Access token được gửi trong header: `Authorization: Bearer <token>`
-   Refresh token được lưu trong HTTP-only cookie

## Tính năng

### Frontend

-   Responsive design
-   Real-time updates với WebSocket
-   Xử lý lỗi và hiển thị thông báo
-   Animation và loading states
-   Quản lý state với Context API

### Backend

-   RESTful API
-   JWT Authentication
-   MongoDB với Mongoose
-   WebSocket cho real-time updates
-   Validation và error handling

## Công nghệ sử dụng

### Frontend

-   React
-   React Router
-   Context API
-   Socket.io-client
-   Axios
-   React Toastify
-   CSS Modules

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   Socket.io
-   JWT
-   Bcrypt
