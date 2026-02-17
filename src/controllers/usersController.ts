import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as userService from "../services/userServices";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await userService.register(req.body);
    res.status(201).json({
        message: "Usuario registrado correctamente",
        token
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await userService.login(req.body);
    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        id: user._id
    });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users
    });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = await userService.getUserById(id);
    res.status(200).json({
        success: true,
        data: user
    });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = await userService.updateUser(id, req.body);
    res.status(200).json({
        message: "Usuario actualizado correctamente",
        user: { name: user.name, email: user.email, role: user.role }
    });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await userService.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    });
});

export const getProfile = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Acceso permitido",
        user: req.user
    });
};

export const getAdminData = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Acceso de administrador permitido",
        user: req.user
    });
};

