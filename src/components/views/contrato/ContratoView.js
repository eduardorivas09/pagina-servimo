import {GenericView} from "../GenericView";
import React, {Fragment} from "react";
import Table from "../../controls/table/Table";
import {ContratoModalView} from "./ContratoModalView";
import UsuarioModalView from "../security/usuario/UsuarioModalView";
import {UsuarioService} from "../../../services/seguridad/UsuarioService";
import {ContratoService} from "../../../services/contratos/ContratoService";

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



    loadData() {

        new ContratoService()
            .getAll()
            .then(resp => {
                console.log(resp);
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                    this.setState({
                        data: resp
                    })
                }

            }).catch(e => {

            if (e instanceof Error){
                this.mostrarMensajeError('Acceso denegado', e.message);
            }
        });

    }

    componentDidMount() {
        this.loadData();
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
    /**
     * {
  "id": 101,
  "codigoContrato": "65608",
  "fechaContrato": [
    2020,
    11,
    6
  ],
  "fechaInicio": [
    2020,
    11,
    6
  ],
  "fechaExpira": [
    2022,
    10,
    3
  ],
  "diaPago": 1,
  "estado": "ACTIVO"
}
     */
    visibledColumns = () => {
        return [
            {
                field:"codigoContrato",
                header:"Codigo contrato",
                sortable:true
            },{
                field:"fechaContrato",
                header:"Fecha inicio",
                sortable:true
            },{
                field:"fechaExpira",
                header:"Fecha Expira",
                sortable:true
            },{
                field:"diaPago",
                header:"Dia pago",
                sortable:true
            }
        ]
    }

    onRowDoubleClick = () => {

    }

    render() {
        return (
            <Fragment>
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                        onClickAdd={this.addContrato}
                       onRowDoubleClick={this.onRowDoubleClick}
                       entity="Rol"/>

                       <ContratoModalView header={'Usuarios'}
                                          visible={this.state.modalVisible}
                                          onHide={this.onCloseModal}
                                          hasGuardarCancelarButtons={true}
                                          onClickNoButton={this.onCloseModal}
                                          onClickYesButton={this.onClickSave}
                                          ref={this.contratoRef}
                                          />
            </Fragment>
        )
    }
}