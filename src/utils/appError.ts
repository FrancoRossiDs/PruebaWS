export default class AppError extends Error{
    //clase personalizada para manejar errores
    public statusCode: number;

    constructor(message: string, statusCode: number){
        //contructor en ts para inicializar la clase
        super(message);
        // llama al constructor de la clase padre Error
        this.statusCode = statusCode;
        // asigna el código de estado HTTP al error

        Object.setPrototypeOf(this, AppError.prototype);
        //esto es necesario para mantener la cadena de prototipos correcta en TypeScript
    }
}
