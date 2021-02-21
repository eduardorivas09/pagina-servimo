export class Utils {

    /**
     * Meltodo que convierte una fecha contenida en milisegundos Unix Timestamp a una fecha en String.
     * @param value valor a ser computado.
     * @returns {string}  cadena que contiene la fecha.
     * @constructor
     */
    static ConvertTimestampToIsoStringDate = (value) => {
        return new Date(value).toISOString().split('T')[0];
    }
    static ConvertTimestampToIsoStringDateTime = (value) => {
        const fecha = new Date(value).toISOString()
        return fecha.split('T')[0] + ' ' + fecha.split('T')[1]



    }

}