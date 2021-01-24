import React, {Fragment} from 'react';
import $ from 'jquery';
import 'bootstrap';
import {ClienteNaturalService} from "../../../../services/clientes/ClienteNaturalService";
import DialogModal from "../../alerts/DialogModal";
import Table from "../../../controls/table/Table";
import ClienteNaturalModal from "./ClienteNaturalModal";

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
        this.rowClicked = this.rowClicked.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.addNewClienteNatural = this.addNewClienteNatural.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.onClickYesButton = this.onClickYesButton.bind(this);
        this.onClickNoButton = this.onClickNoButton.bind(this);

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

    rowClicked(e) {
        let rowId = e.target.parentNode.firstChild.textContent;

        this.setState({
            rowId : rowId
        })

        this.getModal();
        $('#exampleModal').modal('show');

    }

    componentDidMount() {
        this.loadData();
    }

    loadData(search) {

        new ClienteNaturalService()
            .getFiltered(search)
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
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

    getModal(){
        this.refs.child.findById(this.state.rowId);
    }

    onButtonClick(){
        this.setState({
            rowId : -1
        })

        this.getModal();
        $('#exampleModal').modal('show');
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

    onClickYesButton = () => {
        const cliente = this.ClienteModal.current.getCliente();
        console.log(cliente);

        const clienteNaturalService = new ClienteNaturalService();
        if (cliente.id !== undefined && cliente.id > 0) {
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
        }else{
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
    }

    onClickNoButton = () => {
        alert('Sobre, se cierra bajo su orden!')
        this.onHideModal();
    }

    render() {
        return (
            <Fragment>
                {/*Tabla de prime react*/}
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       onClickAdd={this.addNewClienteNatural}
                       onRowDoubleClick={this.onRowDoubleClick}
                       entity="Cliente Juridico"/>

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
            </Fragment>

        );
    }
}