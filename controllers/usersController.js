//const {body, validationResult} = require('express-validator');
// importa las funciones body y validationResult de express-validator para validar datos de entrada
//body: para validar y sanitizar campos en el cuerpo de la solicitud
//validationResult: para recopilar los resultados de la validación y manejar errores
//const { validationResult } = require('express-validator');
//const bcrypt = require('bcryptjs'); //importa la libreria bcryptjs para hashear contraseñas
//const jwt = require('jsonwebtoken'); //importa la libreria jsonwebtoken para crear tokens de autenticación
//const AppError = require('../utils/appError');

const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/userServices');


exports.register = asyncHandler(async (req, res) => {
    const {user, token} =await userService.register(req.body);
    res.status(201).json({
        message: "Usuario registrado correctamente",
        token
    })
})

exports.login = asyncHandler(async (req, res) =>{
    const {user, token} =await userService.login(req.body);
    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        id: user._id
    })
})

exports.getUsers = asyncHandler( async (req, res) =>{
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users
    })
})

exports.getUserById = asyncHandler(async (req, res) =>{
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
        success: true, 
        data: user
    })
})

exports.updateUser= asyncHandler(async (req, res) =>{
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
        message: "Usuario actualizado correctamente",
        user: {name: user.name, email: user.email, role: user.role 
        }
    })
});

exports.deleteUser = asyncHandler(async (req, res) =>{
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente",
    })
})

exports.getProfile = (req, res) =>{
    res.status(200).json({
        message: "Acceso permitido",
        user: req.user
    })
}

exports.getAdminData = (req, res) =>{
    res.status(200).json({
        message: "Acceso de administrador permitido",
        user: req.user
    })
}
