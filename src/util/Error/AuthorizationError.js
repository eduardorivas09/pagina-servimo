export class AuthorizationError extends Error{

    static CODE = 'authorization_err_1';

    constructor() {
        super("Se le ha denegado el acceso.");
        this.code = AuthorizationError.CODE
    }

}