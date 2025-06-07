# Hệ Thống Đặt Món Nhà Hàng

Hệ thống đặt món nhà hàng với các tính năng:

-   Đăng ký/Đăng nhập
-   Xem danh sách món ăn
-   Thêm món vào giỏ hàng
-   Thanh toán
-   Quản lý đơn hàng
-   Cập nhật real-time

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

2. Tạo file .env trong thư mục backend:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_jwt_secret
```

3. Chạy server:

```bash
npm run dev
```

### Frontend

1. Cài đặt dependencies:

```bash
cd frontend
npm install
```

2. Tạo file .env trong thư mục frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Chạy ứng dụng:

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

-   POST /api/auth/register - Đăng ký
-   POST /api/auth/login - Đăng nhập
-   GET /api/auth/me - Lấy thông tin user hiện tại

### Categories

-   GET /api/categories - Lấy danh sách danh mục
-   GET /api/categories/:id - Lấy thông tin danh mục

### Menu Items

-   GET /api/menu-items - Lấy danh sách món ăn
-   GET /api/menu-items/:id - Lấy thông tin món ăn

### Orders

-   POST /api/orders - Tạo đơn hàng
-   GET /api/orders - Lấy danh sách đơn hàng
-   GET /api/orders/:id - Lấy thông tin đơn hàng
-   PUT /api/orders/:id - Cập nhật đơn hàng
-   DELETE /api/orders/:id - Hủy đơn hàng

### Tables

-   GET /api/tables - Lấy danh sách bàn
-   GET /api/tables/:id - Lấy thông tin bàn

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

## Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Giấy phép

MIT
