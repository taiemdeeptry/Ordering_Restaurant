const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const checkAdmin = async () => {
    try {
        console.log("Đang kết nối với MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const admin = await User.findOne({ role: "admin" });
        if (admin) {
            console.log("\n✅ Tìm thấy tài khoản admin:");
            console.log(`Username: ${admin.username}`);
            console.log(`Email: ${admin.email}`);
            console.log(`Role: ${admin.role}`);
        } else {
            console.log("\n❌ Không tìm thấy tài khoản admin");
            console.log("Đang tạo tài khoản admin mới...");

            const newAdmin = new User({
                username: "admin",
                email: "admin@restaurant.com",
                password: "admin123",
                role: "admin",
            });

            await newAdmin.save();
            console.log("\n✅ Đã tạo tài khoản admin thành công!");
            console.log("Username: admin");
            console.log("Password: admin123");
        }
    } catch (error) {
        console.error("Lỗi:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

checkAdmin();
