
import React, { Fragment, useState } from 'react';
import 'bootstrap';
import { TrabajadoresService } from "../../../services/Trabajadores/TrabajadoresService";
import Table from "../../controls/table/Table";
import { Toast } from 'primereact/toast';
import TrabajadorModal from "./TrabajadorModal";
import { GenericView } from '../GenericView';
import { ClienteNaturalService } from '../../../services/clientes/ClienteNaturalService';
//import { Validation } from "../../../../util/validations/Validation";

export default class Trabajador extends GenericView {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            busqueda: "",
            data: [],
            selectedRow: null,
            rowid: -1,
        }
        this.TrabajadorModal = React.createRef();
        this.buscar = this.buscar.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onHideModal = this.onHideModal.bind(this)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onClickNoButton = this.onClickNoButton.bind(this)
        this.onClickYesButton = this.onClickYesButton.bind(this)
        this.addAgregarTrabajador = this.addAgregarTrabajador.bind(this)
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
        this.toast = React.createRef();
    }


    buscar(e) {
        e.preventDefaul();
        if (this.state.busqueda.trim().length > 0) {
            this.loadData(this.state.busqueda);
        }
        if (this.state.busqueda.trim().length === 0) {
            this.loadData();
        }
    }


    onSearchChange(e) {
        this.setState({
            busqueda: e.target.value
        })

        if (this.state.busqueda.trim().length === 0) {
            this.loadData();
        }
    }

    loadData() {

        new TrabajadoresService()
            .get()
            .then(resp => {
                if (resp instanceof Response && resp.status === 2000 || resp instanceof Array) {
                    console.log(resp)
                    this.setState({
                        data: resp
                    });
                }
            })
            .catch(e => {

                if (e instanceof Error) {
                    this.mostrarMensajeError('Acceso denegado', e.message)
                }
            });
    }


    addAgregarTrabajador = () => {

        this.setState({
            showModal: true
        });
        this.TrabajadorModal.current.setTrabajador(null);
    }


    updateTrabajador = (trabajador) => {
        console.log(trabajador)
        const trabajadoresService = new TrabajadoresService();
        trabajadoresService.update(trabajador)
            .then(response => {
                this.mostrarMensajeOk(
                    'Trabajador Actulizado',
                    'trabajador' + response.primerNombre + '' + response.primerApellido

                );
                this.loadData();
                this.onHideModal();

            })
            .catch(e => {
                this.mostrarMensajeError('No se Actualizo el trabajador', e.message)
            });
    }

    saveNewTrabajador = (trabajador) => {
        console.log(trabajador)
        if (trabajador === null) {
          return;
        }
        
        const trabajadoresService = new TrabajadoresService();
        trabajadoresService.save(trabajador)
            .then(response => {
                this.mostrarMensajeOk(
                    'Trabajador Ingresado',
                    'trabajador' + response.primerNombre + '' + response.primerApellido
                );

                this.loadData();
                this.onHideModal();

            })
            .catch(e => {
                this.mostrarMensajeError('No se Registro  el trabajador', e.message)
            });
    }


    validarGuardar = (trabajador) => {
        if (trabajador === null || trabajador === undefined) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');

        }

    }

    onClickYesButton = () => {
        const trabajador = this.TrabajadorModal.current.getTrabajador();

        if (trabajador !== null) {
            console.log(trabajador)
            if (trabajador.id !== undefined && trabajador.id > 0) {
                this.updateTrabajador(trabajador);
            } else {
                this.saveNewTrabajador(trabajador)
                console.log(trabajador)
            }
        }
    }


    componentDidMount() {
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
                field: "telefono",
                header: "Tefono",
                sortable: false
            }, {
                field: "direccion",
                header: "Direccion",
                sortable: true
            },
            {
                field: "cargo.nombreCargo",
                header: "Cargo",
                sortable: true
            }, {
                field: "estado",
                header: "Estado",
                sortable: true
            },

        ]
    }


    onHideModal = () => {
        this.setState({
            showModal: false
        });
    }

    openEditMadal = (trabajador) => {
        this.setState({
            showModal: true,
            selectedRow: trabajador
        });
        this.TrabajadorModal.current.setTrabajador(trabajador);
    }

    onRowDoubleClick = (e) => {
        this.openEditMadal(e);
    }

    onClickNoButton = () => {

        this.onHideModal();
    }

    onClickDeleteButton = () => {
        this.state.selectedRow.data.activo = false;
        this.updateTrabajador(this.state.selectedRow);
    }

    render() {

        return (
            <Fragment>
                <Table promise={this.state.data}
                    columns={this.visibledColumns()}
                    onClickAdd={this.addAgregarTrabajador}
                    onRowDoubleClick={this.onRowDoubleClick}
                    deleteButto={false}
                    onClickDeleteButton={this.onClickDeleteButton}

                    entity="Trabajadores" />

                <TrabajadorModal visible={this.state.showModal}
                    onHide={this.onHideModal}
                    hasGuardarCancelarButtons={true}
                    onClickNoButton={this.onClickNoButton}
                    onClickYesButton={this.onClickYesButton}
                    visible={this.state.showModal}
                    ref={this.TrabajadorModal}
                />
                <Toast ref={this.toast} position={this.right()} />

            </Fragment>
        );

    }
}
