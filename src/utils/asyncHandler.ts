import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise
            .resolve(fn(req, res, next))
            .catch(next);
    }
}

//este modulo maneja los errores en la aplicación Express
//recibe cuatro parámetros: el error, la solicitud, la respuesta y la siguiente función de middleware
//recibe funciones async y captura cualquier error que ocurra dentro de ellas
//si hay un error, llama a la función next con el error para pasarlo al siguiente middleware de manejo de errores


export default asyncHandler;