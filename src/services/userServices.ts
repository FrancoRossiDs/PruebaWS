import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository';

import { RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from "../types/express";
import AppError from "../utils/appError";

export const register = async ({ name, email, password, role }: RegisterUserDTO) => {
    if (!name || !email || !password || !role) {
        throw new AppError('Faltan datos obligatorios', 400);
    }

    const exist = await userRepository.findByEmail(email);
    if (exist) throw new AppError('Email ya registrado', 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return { user: newUser, token };
};

export const login = async ({ email, password }: LoginUserDTO) => {
    if (!email || !password) {
        throw new AppError('Faltan datos obligatorios', 400);
    }

    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('Usuario no encontrado', 404);

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) throw new AppError('Contraseña incorrecta', 401);

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return { user, token };
};

export const getAllUsers = async () => {
    return await userRepository.findAll();
};

export const getUserById = async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
};

export const updateUser = async (id: string, updateUser: UpdateUserDTO) => {
    const user = await userRepository.updateById(id, updateUser);
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
};

export const deleteUser = async (id: string) => {
    const user = await userRepository.deleteById(id);
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
};
