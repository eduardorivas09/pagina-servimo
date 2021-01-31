export class SavingError extends Error{

    static CODE = "save_err_1"

    constructor(msg) {
        super("No se ha logrado guardar la informacion debido a:  " + msg);
        this.code = SavingError.CODE
    }

}