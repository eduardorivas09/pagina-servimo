import GenericModal from "../modal/GenericModal";
import React from "react";
import { Dialog } from "primereact/dialog";
import { TabView } from "primereact/tabview";


export default class HorarioModal extends GenericModal {

    constructor() {
        super();
        this.state = {
            id: -1,
            CodigoTrabajador: '',
            HoraEntrada: '',
            HoraSalida: '',
            Turno: '',
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

    }

    getHorario = () => {

    }

    componentDidMount() {

    }



    toRender = () => {
        return (

            <div className="container m-0">
              <TabView>
                  
              </TabView>
            </div>

        );


    }


}