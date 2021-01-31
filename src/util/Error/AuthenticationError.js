export class AuthenticationError extends Error{

    static CODE = 'auth_err_1';

    constructor(msg) {
        super("Usuario o contraseña incorrecta");
        this.code = AuthenticationError.CODE
    }

    
}
