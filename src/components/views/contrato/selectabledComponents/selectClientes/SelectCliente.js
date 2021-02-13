import React, {Fragment} from 'react';
import {ClienteService} from "../../../../../services/clientes/ClientesService";
import Table from "../../../../controls/table/Table";
import {GenericView} from "../../../GenericView";
import {Toast} from "primereact/toast";
import DialogModal from "../../../alerts/DialogModal";
import ClienteJuridicoModal from "../../../clientes/juridico/ClienteJudiricoModal";
import {ClienteJuridicoService} from "../../../../../services/clientes/ClienteJuridicoService";
import ClienteNaturalModal from "../../../clientes/natural/ClienteNaturalModal";
import {ClienteNaturalService} from "../../../../../services/clientes/ClienteNaturalService";

export default class SelectCliente extends GenericView{

    constructor() {
        super();
        this.state = {
            clientesDatos: [],
            clienteSeleccionado: null,
            visibledJuridico: false,
            visibledNatural: false,
            modalProps : {
                visible : false     //  Propiedad de tipo boolean que si es true el modal se muestra.
            }
        }

        this.modalJuridico = React.createRef();
        this.clienteNaturalModal = React.createRef();
    }

    onRowDoubleClickCliente = (cliente) => {
        this.setState({
            clienteSeleccionado: cliente
        });
        this.mostrarMensajeOk(`Se ha seleccionado al ${cliente.data.tipoCliente}: ${cliente.data.nombre}`);
    }

    getCliente = () => {
        return this.state.clienteSeleccionado;
    }

    setSelectConverToNatural(cliente){
        const newNliente = {
            id: cliente.data.id,
            nombre: cliente.data.primerNombre + ' ' + cliente.data.primerApellido,
            correo: cliente.data.correo,
            telefono: cliente.data.telefono
        }
        console.log(newNliente)
        this.onRowDoubleClickCliente(newNliente);
    }

    /**
     * Al seleccionar cliente natural
     */
    onClickNoButton = () => {
        this.setState({
            visibledNatural: true
        });this.onHide();
    }

    /**
     * Al seleccionar cliente juridico
     */
    onClickYesButton = () => {
        this.setState({
            visibledJuridico: true
        });
        this.onHide();
    }

    /**
     * Al seleccionar cliente natural
     */
    onClickNoButtonJuridico = () => {
        this.onHideModalJuridico();
    }

    /**
     * Al seleccionar cliente natural
     */
    onClickNoButtonNatural = () => {
        this.onHideModalNatural();
    }


    /**
     * Al seleccionar cliente juridico
     */
    onClickYesButtonJuridico = () => {
        const cliente = this.modalJuridico.current.getCliente();
        const newCliente = new ClienteJuridicoService().save(cliente)
            .then(response => {
                this.mostrarMensajeOk('Se ha guardado el cliente juridico ' + response.nombre);
                this.loadData();
                this.onHideModalJuridico();
        }).catch(error => {
            this.mostrarMensajeError(`Cliente Juridico no guardado: ${error.message}`);
            });
    }

    /**
     * Al seleccionar cliente natural
     */
    onClickYesButtonNatural = () => {
        const cliente = this.clienteNaturalModal.current.getCliente();
        new ClienteNaturalService().save(cliente)
            .then(response => {
                this.mostrarMensajeOk('Se ha guardado el cliente juridico ' + response.primerNombre);
                this.loadData();
                this.onHideModalNatural();
        }).catch(error => {
            this.mostrarMensajeError(`Cliente Natural no guardado: ${error.message}`);
            });
    }

    /**
     * El metodo que oculta el modal cambiando el estado del mismo a visible false
     */
    onHide = () => {
        this.setState({
            modalProps : {
                visible : false
            }
        });
    }

    onHideModalJuridico = () => {
        this.setState({
            visibledJuridico: false
        })
    }

    onHideModalNatural = () => {
        this.setState({
            visibledNatural: false
        })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        new ClienteService().getAll().then(resp => {
            if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                this.setState({
                    clientesDatos: resp

                })
            }

        }).catch(e => {
            if (e instanceof Error){
                this.mostrarMensajeError('Acceso denegado', e.message)
            }
        });
    }

    addNewCliente = () => {
        this.setState({
            modalProps : {
                visible : true
            }
        });
    }

    getClienteSeleccionado() {
        return this.state.clienteSeleccionado;
    }

    render() {
        let clienteCols = [
            {
                field:"nombre",
                header:"Nombre(s)",
                sortable:true
            },{
                field:"telefono",
                header:"Numero Telefonico",
                sortable:true
            },{
                field:"correo",
                header:"Correo",
                sortable:false
            },{
                field:"tipoCliente",
                header:"Tipo Cliente",
                sortable:true
            },{
                field:"activo",
                header:"Activo",
                sortable:true
            }
        ]

        return(
            <Fragment>
                <div className="row">
                    <Table promise={this.state.clientesDatos}
                           columns={clienteCols}
                           onRowDoubleClick={this.onRowDoubleClickCliente}
                           deleteButton={false}
                           onClickAdd={this.addNewCliente}
                           entity="Cliente" />
                </div>

                {/*Mensajes*/}
                <Toast ref={this.toast} position={this.right()}/>

                {/*Selecciona del tipo de cliente, natural o juridico*/}
                <DialogModal header={'Tipo de cliente'}
                             textBody={'Eliga el tipo de cliente'}
                             hasYesNotButtons={true}
                             btnNoLabel={'Natural'}
                             btnSiLabel={'Juridico'}
                             modalType={'info'}
                             visible={this.state.modalProps.visible}
                             onClickNoButton={this.onClickNoButton}
                             onClickYesButton={this.onClickYesButton}
                             onHide={this.onHide}/>

            {/*      Modal cliente natural           */}
                <ClienteNaturalModal visible={this.state.visibledNatural}
                                     onHide={this.onHideModalNatural}
                                     onClickNoButton={this.onClickNoButtonNatural}
                                     onClickYesButton={this.onClickYesButtonNatural}
                                     ref={this.clienteNaturalModal}/>

            {/*Cliente Juridico*/}
            <ClienteJuridicoModal
                visible={this.state.visibledJuridico}
                onClickNoButton={this.onClickNoButtonJuridico}
                onClickYesButton={this.onClickYesButtonJuridico}
                onHideModal={this.onHideModalJuridico}
                ref={this.modalJuridico}/>
            </Fragment>
        );
    }
}