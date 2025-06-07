const mongoose = require("mongoose");
const Table = require("../models/Table");

const tables = [
    // Bàn 2 người (8 bàn)
    ...Array.from({ length: 8 }, (_, i) => ({
        number: `A${String(i + 1).padStart(2, "0")}`,
        capacity: 2,
        isAvailable: true,
        status: "available",
    })),
    // Bàn 4 người (6 bàn)
    ...Array.from({ length: 6 }, (_, i) => ({
        number: `B${String(i + 1).padStart(2, "0")}`,
        capacity: 4,
        isAvailable: true,
        status: "available",
    })),
    // Bàn 6 người (5 bàn)
    ...Array.from({ length: 5 }, (_, i) => ({
        number: `C${String(i + 1).padStart(2, "0")}`,
        capacity: 6,
        isAvailable: true,
        status: "available",
    })),
    // Bàn 8 người (3 bàn)
    ...Array.from({ length: 3 }, (_, i) => ({
        number: `D${String(i + 1).padStart(2, "0")}`,
        capacity: 8,
        isAvailable: true,
        status: "available",
    })),
    // Bàn 10 người (2 bàn)
    ...Array.from({ length: 2 }, (_, i) => ({
        number: `E${String(i + 1).padStart(2, "0")}`,
        capacity: 10,
        isAvailable: true,
        status: "available",
    })),
];

const createTables = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://21520260:taiem2003@21520260-ie213.vok2w.mongodb.net/?retryWrites=true&w=majority&appName=21520260-IE213", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing tables
        await Table.deleteMany({});

        // Insert new tables
        await Table.insertMany(tables);

        console.log("Tables created successfully!");
        console.log("Total tables created:", tables.length);

        // Log table details
        tables.forEach((table) => {
            console.log(`Created table ${table.number} (${table.capacity} people) - Status: ${table.status}`);
        });

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error creating tables:", error);
        process.exit(1);
    }
};

createTables();
