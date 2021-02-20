import GenericModal from "../modal/GenericModal";
import React from "react";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { HorariosService } from "../../../services/Horarios/HorariosService";


export default class HorarioModal extends GenericModal {

    constructor() {
        super();
        this.state = {
            id: -1,
            codigoContrato: '',
            CodigoTrabajador: '',
            NombreTrabajador: '',
            HoraEntrada: '',
            HoraSalida: '',
            Turno: '',
            clienteIdentificador: '',
            TipoCliente: '',
            Nombrecliente: '',
            TrabajadorInactivo: [],
            estado: false

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
        const horario = {
            'contratoId': this.state.id,
            'codigoContrato': this.state.codigoContrato,
            'codigoTrabajador': this.state.CodigoTrabajador,
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

        if (this.state.id !== undefined && this.state.state > 0) {
              horario.id = this.state.id;
        }
        return horario;
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



    toRender = () =>{
        return (
         
                <div className="container m-0">
                <TabView>
                    <TabPanel header={'Horarios'}>

                    </TabPanel>
                </TabView>
            </div>
            

           

        );


    }


}