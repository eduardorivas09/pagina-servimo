export class NetworkConnectionError extends Error{

    static CODE = "net_err_1"

    constructor() {
        super("No se ha podido establecer la conexion con el servidor de aplicaciones");
        this.code = NetworkConnectionError.CODE
    }

}