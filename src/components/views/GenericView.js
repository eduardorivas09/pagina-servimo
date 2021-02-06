import React from 'react';

/**
 * @author Josue David Reyes Molina
 * @version 1.0
 * @since  1.0, 02/02/2021
 *
 * Clase generica que contiene metodos de utilidades.
 */
export class GenericView extends React.Component{

    constructor() {
        super();
        this.toast = React.createRef(null)
    }

    //  SERIE DE METODOS PARA MENSAJERIA

    /**
     * Metodo que muestra un mensaje de error
     *
     * @since 1.0
     * @param headerMessage titulo del mensaje
     * @param mensaje cuerpo del mensaje
     */
    mostrarMensajeError = (headerMessage, mensaje) => {
        this.#mostrarMensaje('error', headerMessage, mensaje)
    }

    /**
     * Metodo que muestra un mensaje de alerta
     *
     * @since 1.0
     * @param headerMessage titulo del mensaje
     * @param mensaje cuerpo del mensaje
     */
    mostrarMensajeAdvertencia = (headerMessage, mensaje) => {
        this.#mostrarMensaje('warn', headerMessage, mensaje)
    }

    /**
     * Metodo que muestra un mensaje informativo
     *
     * @since 1.0
     * @param headerMessage titulo del mensaje
     * @param mensaje cuerpo del mensaje
     */
    mostrarMensajeInformacion = (headerMessage, mensaje) => {
        this.#mostrarMensaje('info', headerMessage, mensaje)
    }

    /**
     * Metodo que muestra un mensaje de Ok
     *
     * @since 1.0
     * @param headerMessage titulo del mensaje
     * @param mensaje cuerpo del mensaje
     */
    mostrarMensajeOk = (headerMessage, mensaje) => {
        this.#mostrarMensaje('success', headerMessage, mensaje)
    }

    /**
     * Metodo que muestra un mensaje.
     *
     * @since 1.0
     * @param severity severidad del mensaje
     * @param headerMessage titulo del mensaje
     * @param mensaje cuerpo del mensaje
     */
    #mostrarMensaje = (severity, headerMessage, mensaje) => {
        this.toast.current.show({severity:severity, summary: headerMessage, detail:mensaje, life: 5000});
    }

    /**
     * Contiene la clase css que representa la alineacion hacia arriba a la izquierda
     * @since 1.0
     *
     * @returns {string}
     */
    right = () => {
        return "top-right";
    }

    /**
     * Contiene la clase css que representa la alineacion hacia arriba a la izquierda
     * @since 1.0
     *
     * @returns {string}
     */
    left = () => {
        return "top-right";
    }
}