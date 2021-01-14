export class NetworkConnectionError extends Error{

    static CODE = "net_err_1"

    constructor() {
        super("No se ha podido establecer la conexion con el servidor. " +
            "Si el problema persiste pongase en contacto con el administrador del mismo.");
        this.code = NetworkConnectionError.CODE
    }

}