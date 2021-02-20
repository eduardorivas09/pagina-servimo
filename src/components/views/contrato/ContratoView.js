import {GenericView} from "../GenericView";
import React, {Fragment} from "react";
import Table from "../../controls/table/Table";
import {ContratoModalView} from "./ContratoModalView";
import UsuarioModalView from "../security/usuario/UsuarioModalView";
import {UsuarioService} from "../../../services/seguridad/UsuarioService";
import {ContratoService} from "../../../services/contratos/ContratoService";
import {Utils} from "../../../util/Utils";
import {Toast} from "primereact/toast";
import ContratoTable from "./contratoTable/ContratoTable";

export default class ContratoView extends GenericView{

    constructor() {
        super();
        this.state = {
            data: [],
            modalVisible : false
        }
        this.addContrato = this.addContrato.bind(this);
        this.contratoRef = React.createRef();
    }

    addContrato = () => {
        this.setState({modalVisible: true})
    }

    onClickSave = () => {
        const contrato = this.contratoRef.current.getContrato();
        console.log(contrato);
        if (contrato !== null) {
            this.onCloseModal();
        }
    }


    /**
     * @since 1.0
     * Metodo que cierra el modal para editar agregar.
     */
    onCloseModal = () => {
        this.setState({
            modalVisible : false
        });
    }

    onRowDoubleClick = (e) => {
        console.log(e)
        this.mostrarMensajeInformacion('Contrato pertenece al cliente: ' + e.clienteNombre);
    }

    render() {
        return (
            <Fragment>
                <ContratoTable
                        onClickAdd={this.addContrato}
                        onRowDoubleClick={this.onRowDoubleClick}
                        addContrato={this.addContrato}/>

                       <ContratoModalView header={'Contrato'}
                                          visible={this.state.modalVisible}
                                          onHide={this.onCloseModal}
                                          hasGuardarCancelarButtons={true}
                                          onClickNoButton={this.onCloseModal}
                                          onClickYesButton={this.onClickSave}
                                          ref={this.contratoRef} />
                <Toast ref={this.toast} position={this.right()}/>
            </Fragment>
        )
    }
}