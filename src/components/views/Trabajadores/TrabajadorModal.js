import { Dialog } from 'primereact/dialog';
import React, { Fragment, useState } from 'react';
import { Button } from "primereact/button";


export default class TrabajadorModal extends React.Component {

    constructor() {
        super();
        this.state = {
            id: -1,
            ncedula: '',
            codTrabajado: '',
            foto: '',
            pnombre: '',
            snombre: '',
            papelli: '',
            sapelli: '',
            genero: '',
            estadoC: '',
            telefono: '',
            correo: '',
            direccion: '',
            cargo: '',
            activo: false
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

    setTrabajador = (trabajador) => {
        if (trabajador === undefined || trabajador === null) {
            this.setState({
                id: null,
                ncedula: null,
                codTrabajado: null,
                foto: null,
                pnombre: null,
                snombre: nul,
                papelli: null,
                sapelli: null,
                genero: null,
                estadoC: null,
                telefono: null,
                correo: null,
                direccion: null,
                cargo: null,
                activo: true
            });
        } else {
            this.setState({
                id: trabajador.data.id,
                ncedula: trabajador.data.noCedula,
                codTrabajado: trabajador.data.codTrabajado,
                foto: trabajador.data.foto,
                pnombre: trabajador.data.pnombre,
                snombre: trabajador.data.snombre,
                papelli: trabajador.data.papelli,
                sapelli: trabajador.sapelli,
                genero: { name: trabajador.data.sexo === 'M' ? 'Masculino ' : 'Femenino' },
                estadoC: {name : trabajador.data.estadoC},
                telefono: trabajador.data.telefono,
                correo: trabajador.data.correo,
                direccion: trabajador.data.direccion,
                cargo: {name: trabajador.data.cargo},
                activo: trabajador.data.activo
            }
            );
        }
    }

    getTrabajador = () => {
        const trabajador = {

        }
    }


    reder() {
        return (
            <Dialog className='p-dialog' role='alert'
                header={"Trabajador"}
                position="top-bottom"
                maximizable={true}
                visible={this.props.visible}
                style={{ width: '50vw' }}
                footer={this.renderFooter()}
                onHide={() => this.props.onHide()}

            />

        );
    }

}