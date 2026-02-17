"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        //contructor en ts para inicializar la clase
        super(message);
        // llama al constructor de la clase padre Error
        this.statusCode = statusCode;
        // asigna el código de estado HTTP al error
        Object.setPrototypeOf(this, AppError.prototype);
        //esto es necesario para mantener la cadena de prototipos correcta en TypeScript
    }
}
exports.default = AppError;
