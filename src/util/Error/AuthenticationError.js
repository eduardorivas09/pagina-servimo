export class AuthenticationError extends Error{

    static CODE = 'auth_err_1';

    constructor() {
        super("Usuario o contraseña incorrecta");
        this.code = AuthenticationError.CODE
    }

    
}
