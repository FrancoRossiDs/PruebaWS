import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
};

export default isAdmin;
