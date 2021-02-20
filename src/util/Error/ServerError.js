export class ServerError extends Error{

    static CODE = "ser_err_1"

    constructor() {
        super("Ha ocurrido un error en el servidor");
        this.code = ServerError.CODE
    }

}