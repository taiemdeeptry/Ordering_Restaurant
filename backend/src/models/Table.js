const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        number: {
            type: String,
            required: true,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ["available", "occupied", "reserved", "maintenance"],
            default: "available",
        },
        location: {
            type: String,
            enum: ["indoor", "outdoor", "bar"],
            default: "indoor",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
