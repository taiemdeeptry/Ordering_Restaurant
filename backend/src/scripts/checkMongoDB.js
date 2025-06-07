const mongoose = require("mongoose");
require("dotenv").config();

const checkMongoDB = async () => {
    try {
        console.log("Đang thử kết nối với MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Kết nối MongoDB thành công!");

        // Kiểm tra các collection
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("\nCác collection hiện có:");
        collections.forEach((collection) => {
            console.log(`- ${collection.name}`);
        });
    } catch (error) {
        console.error("❌ Lỗi kết nối MongoDB:", error.message);
        console.log("\nCó thể do:");
        console.log("1. MongoDB chưa được cài đặt");
        console.log("2. MongoDB service chưa chạy");
        console.log("3. Connection string không đúng");
    } finally {
        await mongoose.disconnect();
    }
};

checkMongoDB();
