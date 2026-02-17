"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
};
exports.default = isAdmin;
