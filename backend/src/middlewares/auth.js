const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Check if token starts with 'Bearer '
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({ message: "User account is deactivated" });
        }

        // Add user and token to request
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(401).json({ message: "Authentication failed" });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};

module.exports = { auth, authorize };
