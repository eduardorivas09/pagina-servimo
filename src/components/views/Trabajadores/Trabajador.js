
import React, { Fragment, useState } from 'react';
import 'bootstrap';
import { TrabajadoresService } from "../../../services/Trabajadores/TrabajadoresService";
import Table from "../../controls/table/Table";
import TrabajadorModal from "./TrabajadorModal";

export default class Trabajador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            busqueda: "",
            data: [],
            selectedRow: null,
            rowid: -1,
            ModalProps: {
                modalHeader: null,
                modalMessage: null,
                modalType: 'info',
                visible: false

            }
        }
        this.EmpleadoModal = React.createRef();
        this.buscar =  this.buscar.bid(this)
        this.onHideModal = this.onHideModal.bind(this)
        this.toast = React.createRef();

    }

    buscar(e) {
        e.preventDefaul();
        if (this.state.busqueda.trim().length > 0) {

        }
    }


    loadData(search) {
        new TrajadoresService()
            .getFiltered(search)
            .then(resp => {
                if (resp instanceof Response && resp.status === 2000 || resp instanceof Array) {
                    console.log(resp)
                    this.setState({
                        data: resp
                    })
                }
            })
            .catch(e => {

                if (e instanceof Error) {
                    this.setState({
                        ModalProps: {
                            modalHeader: 'Acceso denegado',
                            modalMessage: e.message,
                            modalType: 'warnig',
                            visible: true
                        }

                    });
                }

            });

    }


    componentDidMount() {
        Session.isLogged();
        this.loadData();
    }

    onHide = () => {
        this.setState({
            ModalProps: {
                visible: false
            }
        });
    }

    visibledColumns = () => {
        return [
            {
                field: "codTrabajador",
                header: "Codigo del Trabajador",
                sortable: true
            },
            {
                field: "primerNombre",
                header: "Nombre",
                sortable: false
            }, {
                field: "primerApellido",
                header: "Apellido",
                sortable: false
            },

            {
                field: "tefono",
                header: "Tefono",
                sortable: false
            }, {
                field: "direccion",
                header: "Direccion",
                sortable: true
            }, {
                field: "estado",
                header: "Estado",
                sortable: true
            }, {
                field: "cargo.nombreCargo",
                header: "Cargo",
                sortable: true
            }


        ]
    }

    onHideModal = () => {
        this.setState({
            showModal: false
        })
    }

    openEditMadal = (cliente) => {
        this.setState({
            showModal: true,
            selectedRow: cliente
        });
 
    }

    render() {

        return (
            <Fragment>
                {/* {/Tabal de Prime reac/} */}
                <Table promise={this.state.data}
                    colums={this.visibledColumns()}
                    entity ="Trabajador"
                />
            </Fragment>
        );

    }
}
