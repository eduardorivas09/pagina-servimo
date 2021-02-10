import React from 'react';
import $ from 'jquery';
import SearchField from "../../../controls/field/input/search/SearchField";
import OldTable from "../../../controls/table/OldTable";
import 'bootstrap';
import { ClienteJuridicoService } from "../../../../services/clientes/ClienteJuridicoService";
import DialogModal from "../../alerts/DialogModal";
import { Fragment } from "react";
import Table from "../../../controls/table/Table";
import ClienteJuridicoModal from './ClienteJudiricoModal';
import { Toast } from 'primereact/toast';
import { GenericView } from '../../GenericView';


export default class ClienteJuridico extends GenericView {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data: [],
            showModal: false,
            selectedRow: null,
            rowId: -1,
           /* modalProps: {
                modalHeader: null,
                modalMessage: null,
                modalType: 'info',
                visible: false

            }*/
        }
        this.ClienteModal = React.createRef();
        this.buscar = this.buscar.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.AgregarClienteJudirico = this.AgregarClienteJudirico.bind(this)
        this.onHideModal = this.onHideModal.bind(this)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onClickYesButton = this.onClickYesButton.bind(this)
        this.onClickNoButton = this.onClickNoButton.bind(this)
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this)

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
        this.loadData();
    }

    loadData(search) {

        new ClienteJuridicoService()
            .getFiltered(search)
            // .getAll().then(resp => console.log(resp))
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array) {
                    this.setState({
                        data: resp
                    })
                }

            }).catch(e => {

                if (e instanceof Error) {
                    this.mostrarMensajeError('Accsos Denegado', e.message)
                }
            });
    }

   
   onHide = () => {
        this.setState({
            modalProps: {
                visible: false
            }
        });
    }

    onHideModal = () => {
        this.setState({
            showModal: false,
        });
    }


    visibledColumns = () => {
        return [
            {
                field: "noRuc",
                header: "Ruc",
                sortable: false
            }, {
                field: "nombre",
                header: "Nombre ",
                sortable: true
            }, {
                field: "direccion",
                header: "Direccion",
                sortable: false
            }, {
                field: "telefono",
                header: "Telefono",
                sortable: false
            }, {
                field: "correo",
                header: "Correo",
                sortable: false
            }, {
                field: "activo",
                header: "Activo",
                sortable: false
            }

        ]

    }

    AgregarClienteJudirico = () => {

        this.setState({
            showModal: true,

        })
        this.ClienteModal.current.setCliente(null)
    }

    openEditModal = (cliente) => {
        this.setState({
            showModal: true,
            selectedRow: cliente
        });
        this.ClienteModal.current.setCliente(cliente);

        console.log('que ocurre aqui')

    }

    onRowDoubleClick = (e) => {
        this.openEditModal(e);
    }

    updateCustomer = (cliente) => {
        console.log(cliente)
        const clienteJuridicoService = new ClienteJuridicoService();
        clienteJuridicoService.update(cliente)
            .then(response => {

                this.mostrarMensajeOk()
                'Clienet Actualizado',
                    'cliente' + response.noRuc + '' + response.nombre

                console.log(response);
                this.loadData();
                this.onHideModal();
            })
            .catch(e => {
                this.mostrarMensajeError('No se Actualiza el Cliente', e.message)
            });


    }

    saveNewCustomer = (cliente) => {
        console.log(cliente)
        const clienteJuridicoService = new ClienteJuridicoService();
        clienteJuridicoService.save(cliente)
            .then(response => {

                this.mostrarMensajeOk(
                    'Cliente Ingresado',
                    'cliente' + response.noRuc + '' + response.nombre
                );
                console.log(response);
                this.loadData();
                this.onHideModal();
            })

            .catch(e => {
                this.mostrarMensajeError('No se registro el cliente')
            });


    }
    onClickYesButton = () => {
        const cliente = this.ClienteModal.current.getCliente();
        console.log(cliente);

        if (cliente !== null) {
            if (cliente.id !== undefined && cliente.id > 0) {
                this.updateCustomer(cliente);
            } else {
                this.saveNewCustomer(cliente);
            }
        }
    }


    onClickDeleteButton = () => {
        this.state.selectedRow.data.activo = false;
        this.updateCustomer(this.state.selectedRow);
    }

    onClickNoButton = () => {

        alert('sobre, se cirra baja su orde')
        this.onHideModal();
    }

   

    render() {
        /*const temp = this.state.data.map(o => {
            let c = Object.assign({}, o);

            delete c.direccion;

            return c;*/

        return (
            <Fragment>
                <Table promise={this.state.data}
                    columns={this.visibledColumns()}
                    onClickAdd={this.AgregarClienteJudirico}
                    onRowDoubleClick={this.onRowDoubleClick}
                    deleteButton={false}
                    onClickDeleteButton={this.onClickDeleteButton}
                    entity="Cliente Juridico" />

                {/*Modal de dialogo*/}

                <ClienteJuridicoModal visible={this.state.showModal}
                    onHide={this.onHideModal}
                    onClickNoButton={this.onClickNoButton}
                    onClickYesButton={this.onClickYesButton}
                    visible={this.state.showModal}
                    hasGuardarCancelarButtons={true}
                    ref={this.ClienteModal} />

                <Toast ref={this.toast} position={this.right()} />
            </Fragment>

        );
    }




}
