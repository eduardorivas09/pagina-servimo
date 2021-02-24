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
import {ContratoClienteJuridicoService} from "../../../services/contratos/ContratoClienteJuridicoService";
import {ContratoClienteNatural} from "../../../services/contratos/ContratoClienteNatural";

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
            if (contrato.cliente.tipoCliente === "Cliente Natural"){
                const contratoClienteNatural = {
                    contratoClienteNatural : {
                        fechaInicio: contrato.servicio.fechaInicio,
                        fechaExpira: contrato.servicio.fechaFin,
                        diaPago: contrato.detallePago.diaPago,
                        costoSercio: contrato.detallePago.costoServicio,
                        estado: 0,
                        nomeda: 'NIO',
                        plazoPago : contrato.detallePago.plazoSeleccionado,
                        clienteNatural: {
                            id: contrato.cliente.id,
                        }
                    },
                    servicios : contrato.servicio.servicios
                }
                new ContratoClienteNatural().save(contratoClienteNatural).then(resp => {
                    this.mostrarMensajeOk('Se ha generado el contrato con exito');
                    this.onCloseModal();
                });


            }else if (contrato.cliente.tipoCliente === "Cliente Juridico"){
                const contratoClienteJuridico = {
                    contratoClienteJuridico : {
                        costoServicio: contrato.detallePago.costoServicio,
                        fechaInicio: contrato.servicio.fechaInicio,
                        fechaExpira: contrato.servicio.fechaFin,
                        diaPago: contrato.detallePago.diaPago,
                        estado: 0,
                        moneda: 'NIO',
                        plazoPago : contrato.detallePago.plazoSeleccionado,
                        noRuc: {
                            id: contrato.cliente.id,
                        }
                    },
                    servicios : contrato.servicio.servicios
                }
                console.log(contratoClienteJuridico);
                new ContratoClienteJuridicoService().save(contratoClienteJuridico).then(resp => {
                    this.mostrarMensajeOk('Se ha generado el contrato con exito');
                    this.onCloseModal();
                }).catch(e => {
                    this.mostrarMensajeError("No se ha guardado el contrato", e.message)
                });
            }else {
                this.mostrarMensajeAdvertencia("Cliente no siportado", 'El tipo de cliente no se guardara debido a que no es soportado.');
            }
            //this.onCloseModal();
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
        this.contratoRef.current.setContratoAll(null);
    }

    onRowDoubleClick = (e) => {
        console.log(e)
        this.mostrarMensajeInformacion('Contrato pertenece al cliente: ' + e.clienteNombre);
    }

    render() {
        return (
            <Fragment>
                <ContratoTable
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