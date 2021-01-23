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

        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.rowClicked = this.rowClicked.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.addNewClienteNatural = this.addNewClienteNatural.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
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
    }

    onHideModal = () => {
        this.setState({
            showModal:false
        })
    }

    render() {
        return (
            <Fragment>
                {/*Tabla de prime react*/}
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       onClickAdd={this.addNewClienteNatural}

                       entity="Cliente Juridico"/>

                {/*Modal de dialogo*/}
                <DialogModal header={this.state.modalProps.modalHeader}
                             textBody={this.state.modalProps.modalMessage}
                             hasYesNotButtons={false}
                             modalType={this.state.modalProps.modalType}
                             visible={this.state.modalProps.visible}
                             onHide={this.onHide}/>

                <ClienteNaturalModal visible={this.state.showModal} onHide={this.onHideModal}/>
            </Fragment>

        );
    }
}