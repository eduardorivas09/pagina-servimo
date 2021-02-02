import React, {Fragment, useRef}from 'react';
import $ from 'jquery';
import 'bootstrap';
import {ClienteNaturalService} from "../../../../services/clientes/ClienteNaturalService";
import DialogModal from "../../alerts/DialogModal";
import Table from "../../../controls/table/Table";
import ClienteNaturalModal from "./ClienteNaturalModal";
import { Toast } from 'primereact/toast';
import {Validation} from "../../../../util/validations/Validation";
import {Session} from "../../../../services/seguridad/Session";

export default class ClienteNatural extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            busqueda: "",
            data: [],
            selectedRow : null,
            rowId: -1,
            modalProps : {
                modalHeader : null,
                modalMessage : null,
                modalType : 'info',
                visible : false
            }
        }

        this.ClienteModal = React.createRef();

        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.addNewClienteNatural = this.addNewClienteNatural.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.onClickYesButton = this.onClickYesButton.bind(this);
        this.onClickNoButton = this.onClickNoButton.bind(this);
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);

        this.toast = React.createRef();
    }

    buscar(e) {
        e.preventDefault();
        if (this.state.busqueda.trim().length > 0) {
            this.loadData(this.state.busqueda);
        }
        if (this.state.busqueda.trim().length === 0)
            this.loadData();

    }

    onSearchChange(e) {

        this.setState(
            {
                busqueda: e.target.value
            }
        )

        if (this.state.busqueda.trim().length === 0)
            this.loadData()
    }


    componentDidMount() {
        Session.isLogged();
        this.loadData();
    }

    loadData(search) {

        new ClienteNaturalService()
            .getFiltered(search)
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                    console.log(resp)
                    this.setState({
                        data: resp
                    })
                }

            }).catch(e => {

            if (e instanceof Error){
                this.setState({
                    modalProps : {
                        modalHeader : 'Acceso denegado',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            }
        });

    }


    /**
     * El metodo show abre el modal.
     */
    onHide = () => {
        this.setState({
            modalProps : {
                visible : false
            }
        });
    }

    visibledColumns = () => {
        return [
            {
                field:"primerNombre",
                header:"Nombre",
                sortable:true
            },{
                field:"primerApellido",
                header:"Nombre de Usuario",
                sortable:true
            },{
                field:"noCedula",
                header:"Cedula Identidad",
                sortable:false
            },{
                field:"sexo",
                header:"Genero",
                sortable:true
            },{
                field:"telefono",
                header:"Telefono",
                sortable:false
            },{
                field:"correo",
                header:"Correo",
                sortable:false
            },{
                field:"activo",
                header:"Activo",
                sortable:false
            }
        ]
    }

    addNewClienteNatural = () =>{
        this.setState({
            showModal:true
        })
        this.ClienteModal.current.setCliente(null);
    }

    onHideModal = () => {
        this.setState({
            showModal:false
        })
    }

    openEditModal = (cliente) => {
        this.setState({
            showModal: true,
            selectedRow: cliente
        });
        this.ClienteModal.current.setCliente(cliente);
    }

    onRowDoubleClick = (e) => {
        this.openEditModal(e);
    }

    updateCustomer = (cliente) => {
        console.log(cliente)
        const clienteNaturalService = new ClienteNaturalService();
        clienteNaturalService.update(cliente)
            .then(response => {
                this.setState({
                    modalProps : {
                        modalHeader : 'Cliente Natural Actualizado',
                        modalMessage : 'Cliente ' + response.primerNombre + ' ' + response.primerApellido ,
                        modalType : 'success',
                        visible : true
                    }});
                console.log(response);
                this.loadData();
                this.onHideModal();
            })
            .catch(e => {
                this.setState({
                    modalProps : {
                        modalHeader : 'No se actualizo el Cliente Natural',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            });
    }

    saveNewCustumer = (cliente) => {
        const clienteNaturalService = new ClienteNaturalService();
        clienteNaturalService.save(cliente)
            .then(response => {
                this.setState({
                    modalProps : {
                        modalHeader : 'Registro guardado Cliente Natural',
                        modalMessage : 'Cliente ' + response.primerNombre + ' ' + response.primerApellido ,
                        modalType : 'success',
                        visible : true
                    }});
                console.log(response);
                this.loadData();
                this.onHideModal();
            })
            .catch(e => {
                this.setState({
                    modalProps : {
                        modalHeader : 'No se guardo el Cliente Natural',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            });
    }

    onClickYesButton = () => {
        const cliente = this.ClienteModal.current.getCliente();
        // console.log(cliente);

        if (this.validarGuardar(cliente)){
            if (cliente.id !== undefined && cliente.id > 0) {
                this.updateCustomer(cliente);
            }else{
                this.saveNewCustumer(cliente)
            }
        }
    }

    validarGuardar = (cliente) => {
        if (cliente === null || cliente === undefined){
            this.mostrarMensaje('warn', 'No se ha pasado un objeto valido');
            return false;
        }
        if (cliente.noCedula === null){
            this.mostrarMensaje('warn', 'Cedula: requerida', 'Se requiere un numero de cedula');
            return false;
        }

        let isValid = Validation.validarCedula(cliente.noCedula);

        if (!isValid){
            this.mostrarMensaje('warn', 'Cedula: incorrecta', 'Se requiere un numero de cedula valido');
            return false;
        }
        if (cliente.primerNombre === null || cliente.primerNombre.length == 0){
            this.mostrarMensaje('warn', 'Primer nombre: requerido', 'Se requiere el primer nombre');
            return false;
        }
        if (cliente.primerApellido === null || cliente.primerApellido.length == 0){
            this.mostrarMensaje('warn', 'Primer apellido: requerido', 'Se requiere el primer apellido');
            return false;
        }
        if (cliente.sexo === null || cliente.sexo.length == 0){
            this.mostrarMensaje('warn', 'Genero: requerido', 'Se requiere el genero del cliente');
            return false;
        }
        if (cliente.estadoCivil === null || cliente.estadoCivil.length == 0){
            this.mostrarMensaje('warn', 'Estado Civil: requerido', 'Se requiere el estado civil del cliente');
            return false;
        }

        if (cliente.telefono === null || cliente.telefono.length == 0){
            this.mostrarMensaje('warn', 'Telefono: requerido', 'Se requiere el telefono del cliente');
            return false;
        }
        isValid = Validation.validarTelefono(cliente.telefono)

        if (isValid){
            this.mostrarMensaje('warn', 'Telefono: incorrecto', 'Se requiere el telefono con un formato correcto');
            return false;
        }

        if (cliente.correo === null || cliente.correo.length == 0){
            this.mostrarMensaje('warn', 'Correo: requerido', 'Se requiere el correo del cliente');
            return false;
        }
        if (cliente.direccion === null || cliente.direccion.length == 0){
            this.mostrarMensaje('warn', 'Direccion: requerido', 'Se requiere la direccion del cliente');
            return false;
        }
        if (cliente.activo === null || cliente.activo.length == 0){
            this.mostrarMensaje('warn', 'Estado: requerido', 'Se requiere el estado del cliente');
            return false;
        }
        return true;
    }

    mostrarMensaje = (severity, headerMessage, mensaje) => {
        this.toast.current.show({severity:severity, summary: headerMessage, detail:mensaje, life: 5000});
    }

    onClickNoButton = () => {
        alert('Sobre, se cierra bajo su orden!')
        this.onHideModal();
    }

    onClickDeleteButton = () => {
        this.state.selectedRow.data.activo=false;
        this.updateCustomer(this.state.selectedRow);
    }



    render() {
        return (
            <Fragment>
                {/*Tabla de prime react*/}
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       onClickAdd={this.addNewClienteNatural}
                       onRowDoubleClick={this.onRowDoubleClick}
                       deleteButton={false}
                       onClickDeleteButton={this.onClickDeleteButton}
                       entity="Cliente Natural"/>

                {/*Modal de dialogo*/}
                <DialogModal header={this.state.modalProps.modalHeader}
                             textBody={this.state.modalProps.modalMessage}
                             hasYesNotButtons={false}
                             modalType={this.state.modalProps.modalType}
                             visible={this.state.modalProps.visible}
                             selectedObject={this.state.selectedRow}
                             onHide={this.onHide}/>

                <ClienteNaturalModal visible={this.state.showModal}
                                     onHide={this.onHideModal}
                                     onClickNoButton={this.onClickNoButton}
                                     onClickYesButton={this.onClickYesButton}
                                     ref={this.ClienteModal}/>

                <Toast ref={this.toast} position="top-left"/>
            </Fragment>

        );
    }
}
