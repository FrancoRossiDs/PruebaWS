class AppError extends Error{
    //clase personalizada para manejar errores
    constructor(message, statusCode){
        //contructor en js para inicializar la clase
        super(message);
        // llama al constructor de la clase padre Error
        this.statusCode = statusCode;
        // asigna el código de estado HTTP al error
    }
}

module.exports = AppError;