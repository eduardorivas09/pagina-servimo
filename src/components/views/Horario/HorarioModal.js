import GenericModal from "../modal/GenericModal";
import React from "react";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown"
import { Calendar } from 'primereact/calendar';
import { HorariosService } from "../../../services/Horarios/HorariosService";
import ContratoTable from "../contrato/contratoTable/ContratoTable";



export default class HorarioModal extends GenericModal {

    constructor() {
        super();
        this.state = {
            id: -1,
            codigoContrato: '',
            CodigoTrabajador: null,
            NombreTrabajador: '',
            HoraEntrada: '',
            HoraSalida: '',

            Turno: null,
            Turno: '',
            Turnos: [{ turno: 'Tarde' }, { turno: 'Noche' }, { turno: 'Mañana' }],

            clienteIdentificador: '',
            TipoCliente: '',
            Nombrecliente: '',
            TrabajadorInactivo: [],
            estado: false,
            contratoSlecionado: '',

        }
    }

    renderFooter = () => {
        return (
            <div style={{ marginTop: '1em' }}>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClickYesButton} autoFocus />
            </div>
        );
    }

    setHorario = (horario) => {
        if (horario === undefined || horario === null) {
            this.setState({
                id: null,
                CodigoTrabajador: null,
                codigoContrato: null,
                NombreTrabajador: null,
                HoraEntrada: null,
                HoraSalida: null,
                Turno: null,
                clienteIdentificador: null,
                TipoCliente: null,
                Nombrecliente: null,
                // TrabajadorInactivo: null,
                estado: true
            });
        } else {
            this.setState({
                id: horario.data.contratoId,
                codigoContrato: horario.data.codigoContrato,
                CodigoTrabajador: horario.data.codigoTrabajador,
                NombreTrabajador: horario.data.nombreTrabajador,
                HoraEntrada: horario.data.horaEntrada,
                HoraSalida: horario.data.horaSalida,
                Turno: { name: horario.data.turno },
                clienteIdentificador: horario.data.clienteIdentificador,
                TipoCliente: { nome: horario.data.tipoCliente },
                Nombrecliente: horario.data.clienteNombre,
                estado: horario.data.estado

            });
        }
    }

    getHorario = () => {

        if (!this.validarguardar()) {
            return null;
        }
        const horario = {
            'contrato_id': this.state.id,
            'codigoContrato': this.state.codigoContrato,
            'codigoTrabajador': this.state.CodigoTrabajador.codigoTrabajador,
            'nombreTrabajador': this.state.NombreTrabajador,
            'horaEntrada': this.state.HoraEntrada,
            'horaSalida': this.state.HoraSalida,
            'turno': this.state.Turno !== null ? this.state.Turno.name : null,
            'clienteIdentificador': this.state.clienteIdentificador,
            'tipoCliente': this.state.TipoCliente !== null ? this.state.TipoCliente.name : null,
            'clienteNombre': this.state.Nombrecliente,
            // TrabajadorInactivo: null,
            'estado': this.state.estado
        }

        console.log(horario)

        if (this.state.id !== undefined && this.state.state > 0) {
            horario.id = this.state.id;
        }
        return horario;
    }

    validarguardar() {

        if (this.state.CodigoTrabajador === null) {
            this.mostrarMensajeAdvertencia('Selecione el Trabajador')
            return false;
        }

        if (this.state.Turno === null) {
            this.mostrarMensajeAdvertencia('Selecione el Turno')
            return false;
        }

        if (this.state.HoraEntrada === null) {
            this.mostrarMensajeAdvertencia('Selecione la Hora de Entrada')
            return false;
        }

        if (this.state.HoraSalida === null) {
            this.mostrarMensajeAdvertencia('Selecione la Hora de Slaida')
            return false;
        }

        if (this.state.contratoSlecionado === null) {
            this.mostrarMensajeAdvertencia('Selecione el contrato')
            return false;
        }


        return true;
    }

    componentDidMount() {
        new HorariosService()
            .getAllInactivo()
            .then(response => {
                console.log(response)
                this.setState({
                    TrabajadorInactivo: response
                });
            }).catch(e => {

                this.mostrarMensajeError('Acceso denegado', e.message);
            });
    }

    onRowDoubleClick = (e) => {
        this.mostrarMensajeInformacion('Se ha selecionado el contato')
        this.setState({
            contratoSlecionado: e

        })
    }


    toRender = () => {
        return (

            <div className="container m-0">
                <TabView>
                    <TabPanel header={'Horarios'}>
                        <div className="row">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                <Dropdown value={this.state.CodigoTrabajador}
                                    onChange={(e) => this.setState({ CodigoTrabajador: e.target.value })}
                                    options={this.state.TrabajadorInactivo}
                                    optionLabel="primerNombre"
                                    placeholder="Trabajador Inactivo" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                <Dropdown
                                    value={this.state.Turno}
                                    onChange={(e) => this.setState({ Turno: e.target.value })}
                                    options={this.state.Turnos}
                                    optionLabel="turno"
                                    placeholder="Turnos" />
                            </div>
                        </div>

                        <div className="row mt-3" >
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <Calendar 
                                    style={{ 'width': '100%' }}

                                    value={this.state.HoraEntrada}
                                    onChange={(e) => this.setState({ HoraEntrada: e.target.value })}
                                    value={this.state.horaEntrada}
                                    onChange={(e) => this.setState({ horaEntrada: e.target.value })}
                                    

                                    showTime
                                    hourFormat="12"
                                    placeholder="Hora de Entrada"
                                />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6 ">
                                <Calendar style={{ 'width': '100%' }}
                                    value={this.state.HoraSalida}
                                    onChange={(e) => this.setState({ HoraSalida: e.target.value })}
                                    showTime
                                    hourFormat="12"
                                    placeholder="Hora de Salida"
                                />
                            </div>
                        </div>

                    </TabPanel>

                    <TabPanel header={'Contrato'}>
                        <ContratoTable
                            onRowDoubleClick={this.onRowDoubleClick}
                        //onClickNoButton = {this.onClickNoButton}
                        //onClickYesButton = {this.onClickYesButton}
                        />


                    </TabPanel>

                </TabView>
            </div>




        );


    }


}