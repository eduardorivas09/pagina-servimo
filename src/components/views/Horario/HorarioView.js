import { Fragment } from "react";
import { GenericView } from "../../GenericView";
import Table from "../../controls/table/Table"
import { HorariosService } from "../../../services/Horarios/HorariosService";
import { Session } from "../../../services/seguridad/Session";
import HorarioModal from "./HorarioModal";
import { Toast } from 'primereact/toast';
export default class HorarioWiew extends GenericView {

    constructor() {
        super();
        this.state = {
            showModal: false,
            busqueda: "",
            data: [],
            selectedRow: null,

        }
        this.HorarioModal = React.createRef();
        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.addNewHorarioTrabajador = this.addNewHorarioTrabajador.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
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

    componenDidMoud() {
        Session.isgged();
        this.loadData();
    }


    loadData() {
        new HorariosService()
            .getAll()
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array) {
                    console.log(resp)
                    this.setState({
                        data: resp
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
                // field:"primerNombre",
                header: "Codigo del Trabajador",
                sortable: true
            }, {
                // field:"primerNombre",
                header: "Hora de Entrada",
                sortable: true
            }, {
                // field:"primerNombre",
                header: "Hora de Salida",
                sortable: true
            }, {
                // field:"primerNombre",
                header: "Turno",
                sortable: true
            }, {
                // field:"primerNombre",
                header: "Tipo de Cliente",
                sortable: true
            }, {
                // field:"primerNombre",
                header: "Estado",
                sortable: true
            },


        ]

    }

    addNewHorarioTrabajador = () => {
        this.setState({
            showModal: true
        })
        // this.HorarioModa.current
    }

    onHideModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (

            <Fragment>
                <Table promise={this.state.data}
                    columns={this.visibledColumns()}
                    onClickAdd={this.addNewHorarioTrabajador}
                    entity="Horarios"
                />

                <HorarioModal visible={this.state.showModal}
                    onHide={this.onHideModal}
                />
                <Toast ref={this.toast} position={this.right()} />
            </Fragment>
        );


    }


}       