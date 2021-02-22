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
                }
                new ContratoClienteNatural().save(contratoClienteNatural).then(resp => {
                    this.mostrarMensajeOk('Se ha generado el contrato con exito');
                    this.onCloseModal();
                });


            }else if (contrato.cliente.tipoCliente === "Cliente Juridico"){
                const contratoClienteJuridico = {
                    fechaInicio: contrato.servicio.fechaInicio,
                    fechaExpira: contrato.servicio.fechaFin,
                    diaPago: contrato.detallePago.diaPago,
                    Costoservicio: contrato.detallePago.costoServicio,
                    estado: 0,
                    nomeda: 'NIO',
                    plazoPago : contrato.detallePago.plazoSeleccionado,
                    noRuc: {
                        id: contrato.cliente.id,
                    }
                }
                console.log(contratoClienteJuridico)
                new ContratoClienteJuridicoService().save(contratoClienteJuridico).then(resp => {
                    this.mostrarMensajeOk('Se ha generado el contrato con exito');
                    this.onCloseModal();
                });
            }else {
                this.mostrarMensajeAdvertencia("Cliente no siportado", 'El tipo de cliente no se guardara debido a que no es soportado.');
            }
            //this.onCloseModal();
        }
    }

    /**
     * {
      "cliente": {
        "id": 3056,
        "nombre": "Fernado Gutierres",
        "telefono": "82872090",
        "correo": "fernadoj@gmail.com",
        "activo": true,
        "tipoCliente": "Cliente Natural"
      },
      "servicio": {
        "servicios": [
          {
            "id": 14,
            "tipoSevicio": "Inatalacion de Sistemas de Alarmas",
            "estadoPorEstadoId": {
              "id": 1,
              "codigo": "SERVI",
              "estado": "ACTIVO"
            }
          }
        ],
        "fechaContrato": null,
        "fechaFin": "2021-02-28T06:00:00.000Z",
        "fechaInicio": "2021-02-01T06:00:00.000Z"
      },
      "detallePago": {
        "diaPago": 15,
        "plazoSeleccionado": {
          "id": 3,
          "descripcion": "TRIMESTRAL",
          "plazoMes": 3,
          "plazoEstandar": true,
          "factor": 0
        },
        "costoServicio": 1455
      }
    }
     */

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