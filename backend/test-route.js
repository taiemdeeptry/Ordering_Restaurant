// Test file để kiểm tra route
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Route test is working");
});

// Test route với /:id
app.get("/test/:id", (req, res) => {
    res.json({
        message: "Test route with ID is working",
        id: req.params.id,
    });
});

// Test route với /:id/payment với nhiều HTTP methods
app.get("/test/:id/payment", (req, res) => {
    res.json({
        message: "GET /test/:id/payment is working",
        id: req.params.id,
    });
});

app.put("/test/:id/payment", (req, res) => {
    res.json({
        message: "PUT /test/:id/payment is working",
        id: req.params.id,
        body: req.body,
    });
});

app.post("/test/:id/payment", (req, res) => {
    res.json({
        message: "POST /test/:id/payment is working",
        id: req.params.id,
        body: req.body,
    });
});

// Parse JSON requests
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
});
