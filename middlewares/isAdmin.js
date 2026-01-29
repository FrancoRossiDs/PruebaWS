const AppError = require('../utils/appError');

const isAdmin = (req, res, next) => {
    // Middleware para verificar si el usuario tiene rol de administrador
    if(req.user.role !== 'admin'){
        throw new AppError(
            "Acceso denegado: se requiere rol de administrador", 
            403
        );
    }
    next();
}

module.exports = isAdmin;