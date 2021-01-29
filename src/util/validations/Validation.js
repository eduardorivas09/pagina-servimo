export class Validation{
    static regexNoCedula = /^[0-9]{3}(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])([0-9]{2})[0-9]{4}[A-Y]$/g;
    static regexTelefono = /^[2|5|7|8]\d{7}/g;

    static validarTelefono = (telefono) => {
        if (telefono.length < 8) return false;

        //  QUITA LOS GUIONES DE LA CADENA ORIGINAL
        telefono = telefono.replace('-', '').toUpperCase();

        return Validation.regexNoCedula.test(telefono);
    }

    static validarCedula = (cedula) => {

        if (cedula.length < 14) return false;

        //  QUITA LOS GUIONES DE LA CADENA ORIGINAL
        cedula = cedula.replace('-', '').toUpperCase();

        //  PREFIJO: TRES PRIMEROS DIGITOS
        const prefix = cedula.substring(0,3)

        if (prefix.search(/^[0-9]{3}$/) === -1) return false;

        //  FECHA: LOS 6 DIGITOS QUE REPRESENTAN LA FECHA DE NACIMIENTO
        const date = cedula.substring(3,9);
        if (date.search(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])([0-9]{2})$/) === -1) return false;

        //  SUFIJO: LOS 4 DIGITOS DE SUFIJO
        let sufix = cedula.substring(9,14);
        if (sufix.search(/^[0-9]{4}[A-Y]$/) === -1) return false;
        sufix = sufix.substring(0, sufix.length - 1);

        //  LETRA AL FINAL DE LA CEDULA
        const letra = cedula.substring(13,14);

        //  CALCULA LA LETRA DE LA CEDULA
        const cedulaWithoutLetra = parseInt(prefix + date + sufix);
        const posicionLetra = (cedulaWithoutLetra - Math.floor(cedulaWithoutLetra/23.0) * 23);

        if (posicionLetra < 0 || posicionLetra >= 25) return false;

        const letraCedula = 'ABCDEFGHJKLMNPQRSTUVWXY'.charAt(posicionLetra);


        if (letraCedula !== letra) return false;

        return Validation.regexNoCedula.test(cedula);
    }
}