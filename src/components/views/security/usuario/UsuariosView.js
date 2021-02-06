import React, {Fragment} from 'react';
import Table from "../../../controls/table/Table";
import {ClienteNaturalService} from "../../../../services/clientes/ClienteNaturalService";
import {UsuarioService} from "../../../../services/seguridad/UsuarioService";
import DialogModal from "../../alerts/DialogModal";
import {Toast} from "primereact/toast";
import {GenericView} from "../../GenericView";
import UsuarioModalView from "./UsuarioModalView";

/**
 * Clase que
 */
export default class UsuariosView extends GenericView{

    constructor() {
        super();
        this.state = {
            data : [],
            modaVisible : false
        }
        this.addNewUser = this.addNewUser.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    /**
     * Metodo que carga los datos, estos pueden proceder de una busqueda
     * @param search parametro que sirve como filtro de la busqueda.
     */
    loadData(search) {

        new UsuarioService()
            .getAll()
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                    console.log(resp)
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

    /**
     * Metodo que retorna las columnas que puede mostrar la tabla
     * @returns {({field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean})[]}
     */
    visibledColumns = () => {
        return [
            {
                field:"userName",
                header:"Nombre de Usuario",
                sortable:true
            },{
                field:"rol.rol",
                header:"Rol",
                sortable:true
            },{
                field:"fechaCreacion",
                header:"Fecha Creacion",
                sortable:true
            },{
                field:"activo",
                header:"Estado",
                sortable:false
            },
        ]
    }

    /**
     * Metodo que abre la pantalla de modal al dar click en el boton en agregar.
     */
    addNewUser = () => {
        this.setState({
            modaVisible : true
        });
    }

    /**
     * Metodo que abre el modal para editar un registro al momento de dar click en una fila.
     * @param e objeto a settear al modal.
     */
    onRowDoubleClick = (e) => {
        // LLAMA AL MODAL DE AGREGAR - EDITAR Y LE PASA EL OBJECTO e
    }

    /**
     * Metodo que se ejecuta al cuando el componente fue renderizado y en este mismo se cargan los datos a la tabla.
     */
    componentDidMount() {
        this.loadData();
    }

    onCloseModal = () => {
        this.setState({
            modaVisible : false
        });
    }

    onClickSave = () => {

    }

    render() {
        return (
            <Fragment>
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       onClickAdd={this.addNewUser}
                       onRowDoubleClick={this.onRowDoubleClick}
                       entity="Usuario"/>

                <UsuarioModalView
                    header={'Usuarios'}
                    visible={this.state.modaVisible}
                    onHide={this.onCloseModal}
                    hasGuardarCancelarButtons={true}
                    onClickNoButton={this.onCloseModal} onClickYesButton={this.onClickSave}/>

                <Toast ref={this.toast} position={this.right()}/>
            </Fragment>
        );
    }

}