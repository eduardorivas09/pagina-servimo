
import React, { Fragment } from "react";
import 'bootstrap';
import { GenericView } from "../GenericView"
import Table from "../../controls/table/Table"
import { HorariosService } from "../../../services/Horarios/HorariosService";
import { Session } from "../../../services/seguridad/Session";
import HorarioModal from "../Horario/HorarioModal";
import { Toast } from 'primereact/toast';
import { Utils } from "../../../util/Utils";

export default class HorarioView extends GenericView {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            busqueda: "",
            data: [],
            selectedRow: null,

        }
        this.horarioModal = React.createRef();
        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.addNewHorarioTrabajador = this.addNewHorarioTrabajador.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onClickNoButton = this.onClickNoButton.bind(this)
        this.onClickYesButton = this.onClickYesButton.bind(this)
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

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        HorariosService
        new HorariosService()

            .getAll()
            .then(resp => {
                console.log(resp)
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array) {
                    console.log(resp)

                    this.setState({
                        data: resp.map(e => {
                            e.horaEntradaString = Utils.ConvertTimestampToIsoStringDateTime(e.horaEntrada)
                            e.horaSalidaString = Utils.ConvertTimestampToIsoStringDateTime(e.horaSalida)
                            return e
                        })

                    });
                }
            }).catch(e => {
                if (e instanceof Error) {
                    this.mostrarMensajeError('Acceso denegado', e.message)
                }
            });
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

    visibledColumns = () => {
        return [
            {
                field: "codigoContrato",
                header: "Codigo del Trabajador",
                sortable: true
            }, {
                field: "nombreTrabajador",
                header: "Trabajador",
                sortable: true
            },
            {
                field: "clienteNombre",
                header: "Nombre Cliente",
                sortable: true
            },
            {
                field: "horaSalidaString",
                header: "Hora de Salida",
                sortable: true
            },

            {
                field: "horaSalidaString",
                header: "Hora de Salida",
                sortable: true
            }, {
                field: "turno",
                header: "Turno",
                sortable: true
            }, {
                field: "estado",
                header: "Estado",
                sortable: true
            },

        ]

    }

    addNewHorarioTrabajador = () => {
        this.setState({
            showModal: true
        })
        this.horarioModal.current.setHorario(null);
    }

    onHide = () => {
        this.setState({
            ModalProps: {
                visible: false
            }
        });
    }

    onHideModal = () => {
        this.setState({
            showModal: false
        })
    }

    openEditMadal = (horario) => {
        this.setState({
            showModal: true,
            selectedRow: horario
        });
        this.horarioModal.current.setHorario(horario);
    }

    onRowDoubleClick = (e) => {
        this.openEditMadal(e);
    }

    onClickNoButton = () => {

        this.onHideModal();
    }

    saveNewHorario = (horario) => {
        console.log(horario)
        if (horario === null) {
            return;
        }
        const horariosService = new HorariosService();

        horariosService.save(horario)
            .then(response => {
                this.mostrarMensajeOk(
                    'Horario Ingresado',
                    'horario' + response.codigoTrabajador
                );
                this.loadData();
                this.horarioModal.current.loadTrabajadores();
                this.onHideModal();

            })
            .catch(e => {
                this.mostrarMensajeError('No se Registro el Horario', e.message)
            });
    }

    onClickYesButton = () => {
        const horario = this.horarioModal.current.getHorario();

        if (horario !== null) {
            this.saveNewHorario(horario);
        }
    }


    render() {
        return (

            <Fragment>
                <Table promise={this.state.data}
                    columns={this.visibledColumns()}
                    onClickAdd={this.addNewHorarioTrabajador}
                    onRowDoubleClick={this.onRowDoubleClick}
                    entity="horario"
                />

                <HorarioModal visible={this.state.showModal}
                    onHide={this.onHideModal}
                    //onClickNoButton={this.onClickNoButton}
                    hasGuardarCancelarButtons={true}
                    visible={this.state.showModal}
                    onClickNoButton={this.onClickNoButton}
                    onClickYesButton={this.onClickYesButton}
                    ref={this.horarioModal}

                />
                <Toast ref={this.toast} position={this.right()} />
            </Fragment>
        );


    }


}       