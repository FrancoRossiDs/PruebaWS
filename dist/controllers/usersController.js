"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminData = exports.getProfile = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.login = exports.register = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const userService = __importStar(require("../services/userServices"));
exports.register = (0, asyncHandler_1.default)(async (req, res) => {
    const { user, token } = await userService.register(req.body);
    res.status(201).json({
        message: "Usuario registrado correctamente",
        token
    });
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const { user, token } = await userService.login(req.body);
    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        id: user._id
    });
});
exports.getUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users
    });
});
exports.getUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json({
        success: true,
        data: user
    });
});
exports.updateUser = (0, asyncHandler_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = await userService.updateUser(id, req.body);
    res.status(200).json({
        message: "Usuario actualizado correctamente",
        user: { name: user.name, email: user.email, role: user.role }
    });
});
exports.deleteUser = (0, asyncHandler_1.default)(async (req, res) => {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    });
});
const getProfile = (req, res) => {
    res.status(200).json({
        message: "Acceso permitido",
        user: req.user
    });
};
exports.getProfile = getProfile;
const getAdminData = (req, res) => {
    res.status(200).json({
        message: "Acceso de administrador permitido",
        user: req.user
    });
};
exports.getAdminData = getAdminData;
