import React, {Fragment} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {GenericView} from "../GenericView";
import {Toast} from "primereact/toast";

/**
 * @author Josue David Reyes Molina
 * @version 1.0
 * @class GenericModal es una clase que permite mostrar una pantalla en forma de modal.
 *
 * @export default GenericModal
 * @export Component
 */
export default class GenericModal extends GenericView{

    /**
     * Constructor de la clase
     * @since 1.0
     */
    constructor() {
        super();
    }

    /**
     * Metodo privado que retorna el componente visual de footer.
     * @since 1.0
     *
     * @returns {JSX.Element}
     */
    #renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClickYesButton} autoFocus/>
            </div>
        );
    }

    /**
     * Metodo privado que retorna un componente {Dialog}
     * @since 1.0
     *
     * @param component
     * @returns {JSX.Element}
     */
    #renderDialog = (component) => {
        return  <Fragment>
            <Dialog  className="p-dialog" role="alert"
                     header={this.props.header}
                     position="top-bottom"
                     maximizable={true}
                     visible={this.props.visible}
                     style={{ width: '90vw' }}
                     footer={this.props.hasGuardarCancelarButtons ? this.#renderFooter : <React.Fragment/>}
                     onHide={() => this.props.onHide()} >
                {component}
            </Dialog>
            <Toast ref={this.toast} position={this.right()}/>
        </Fragment>
    }

    /**
     * Metodo que contiene el cuerpo del modal y debe ser sobre-escrito desde las clases hijas
     * @since 1.0
     *
     * @returns {JSX.Element}
     */
    toRender = () => {
        return <h1>Aqui el contenido del sitio, no metas un render en tu pestanha</h1>
    }

    /**
     * Renderiza el componente.
     * @since 1.0
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            this.#renderDialog(this.toRender())
        );
    }
}