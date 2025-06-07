const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },
        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Virtual for table number
orderSchema.virtual("tableNumber").get(function () {
    return this.table ? this.table.number : null;
});

// Ensure virtuals are included in JSON
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
