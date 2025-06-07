const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const createAdmin = async () => {
    try {
        // Kết nối database
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Kiểm tra xem đã có admin chưa
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin account already exists");
            process.exit(0);
        }

        // Tạo tài khoản admin mới
        const admin = new User({
            username: "admin",
            email: "admin@restaurant.com",
            password: "admin123",
            role: "admin",
        });

        await admin.save();
        console.log("Admin account created successfully");
        console.log("Username: admin");
        console.log("Password: admin123");
    } catch (error) {
        console.error("Error creating admin account:", error);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
