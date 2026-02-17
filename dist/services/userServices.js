"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const appError_1 = __importDefault(require("../utils/appError"));
const register = async ({ name, email, password, role }) => {
    if (!name || !email || !password || !role) {
        throw new appError_1.default('Faltan datos obligatorios', 400);
    }
    const exist = await userRepository_1.default.findByEmail(email);
    if (exist)
        throw new appError_1.default('Email ya registrado', 400);
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await userRepository_1.default.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user: newUser, token };
};
exports.register = register;
const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new appError_1.default('Faltan datos obligatorios', 400);
    }
    const user = await userRepository_1.default.findByEmail(email);
    if (!user)
        throw new appError_1.default('Usuario no encontrado', 404);
    const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
    if (!passwordMatch)
        throw new appError_1.default('Contraseña incorrecta', 401);
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};
exports.login = login;
const getAllUsers = async () => {
    return await userRepository_1.default.findAll();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const user = await userRepository_1.default.findById(id);
    if (!user)
        throw new appError_1.default('Usuario no encontrado', 404);
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (id, updateUser) => {
    const user = await userRepository_1.default.updateById(id, updateUser);
    if (!user)
        throw new appError_1.default('Usuario no encontrado', 404);
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const user = await userRepository_1.default.deleteById(id);
    if (!user)
        throw new appError_1.default('Usuario no encontrado', 404);
    return user;
};
exports.deleteUser = deleteUser;
