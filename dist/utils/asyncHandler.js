"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .catch(next);
    };
};
//este modulo maneja los errores en la aplicación Express
//recibe cuatro parámetros: el error, la solicitud, la respuesta y la siguiente función de middleware
//recibe funciones async y captura cualquier error que ocurra dentro de ellas
//si hay un error, llama a la función next con el error para pasarlo al siguiente middleware de manejo de errores
exports.default = asyncHandler;
