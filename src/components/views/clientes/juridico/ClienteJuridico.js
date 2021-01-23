import React from 'react';
import $ from 'jquery';
import SearchField from "../../../controls/field/input/search/SearchField";
import OldTable from "../../../controls/table/OldTable";
import 'bootstrap';
import { ClienteJuridicoService } from "../../../../services/clientes/ClienteJuridicoService";
import DialogModal from "../../alerts/DialogModal";
import { Fragment } from "react";
import Table from "../../../controls/table/Table";
import ClienteJuridicoModal from './ClienteJudiricoModal'

export default class ClienteJuridico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data: [],
            showModal:false,
            modalProps: {
                modalHeader: null,
                modalMessage: null,
                modalType: 'info',
                visible: false
                
            }
        }
        this.buscar = this.buscar.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.AgregarClienteJudirico = this.AgregarClienteJudirico.bind(this)
        this.onHideModal = this.onHideModal.bind(this)
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
                    this.setState({
                        modalProps: {
                            modalHeader: 'Acceso denegado',
                            modalMessage: e.message,
                            modalType: 'warning',
                            visible: true
                        }
                    });
                }
            });
    }

    /**
     * El metodo show abre el modal.
     */
    onHide = () => {
        this.setState({
            modalProps: {
                visible: false
            }
        });
    }

    onHideModal = () => {
        this.setState({
           showModal : false,
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
            },

        ]

    }

    AgregarClienteJudirico = () => {
       
        this.setState({
            showModal:true,
        })
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

                        entity="Cliente Juridico" />

                    {/*Modal de dialogo*/}

                    <DialogModal header={this.state.modalProps.modalHeader}
                        textBody={this.state.modalProps.modalMessage}
                        hasYesNotButtons={false}
                        modalType={this.state.modalProps.modalType}
                        visible={this.state.modalProps.visible}
                        onHide={this.onHide
                        } />
                        <ClienteJuridicoModal visible={this.state.showModal}  onHideModal={this.onHideModal}/>
                </Fragment>

            );
        }

       
    

    }
