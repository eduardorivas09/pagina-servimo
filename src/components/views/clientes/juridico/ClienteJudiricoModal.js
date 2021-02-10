import React, { Fragment } from 'react';
import { Dialog } from "primereact/dialog";

import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import GenericModal from '../../modal/GenericModal';

export default class ClienteJuridicoModal extends GenericModal {

    constructor() {
        super();
        this.state = {
            visible: true,
            id: -1,
            noRuc: '',
            nombre: '',
            correo: '',
            telefono: '',
            direccion: '',
            activo: '',

        }
       // this.onHide = this.onHide.bind(this);
        //this.onYesClick = this.onYesClick.bind(this);
    }

   /*onHide = () => {
        this.setState({
            visible: true
        });
    }

    onYesClick = () => {
        alert('Sin funcionalidad . Trabajando en ello')
    }*/

    renderFooter = () => {
        return (
            <div style={{ marginTop: '1em' }}>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClicYeskButton} autoFocus />
            </div>
        )

    }

    setCliente = (cliente) => {

        if (cliente === undefined || cliente === null) {

            this.setState({
                id: null,
                noRuc: null,
                nombre: null,
                correo: null,
                telefono: null,
                direccion: null,
                activo: true

            });
        } else {
            this.setState({

                id: cliente.data.id,
                noRuc: cliente.data.noRuc,
                nombre: cliente.data.nombre,
                correo: cliente.data.correo,
                telefono: cliente.data.telefono,
                direccion: cliente.data.direccion,
                activo: cliente.data.activo

            });

        }

    }

    getCliente = () => {

        if (!this.validarGuardar()) {
            return null;

        }
        const cliente = {
            'id': this.state.id,
            'noRuc': this.state.noRuc,
            'nombre': this.state.nombre,
            'correo': this.state.correo,
            'telefono': this.state.telefono,
            'direccion': this.state.direccion,
            'activo': this.state.activo
        }
        if (this.state.id !== undefined && this.state.id > 0) {
            cliente.id = this.state.id;
        }
        return cliente;
    }


    validateTelefono = (event) => {
        const str = /^[2|5|7|8]\d{0,7}/g;
        const regex = new RegExp(str);
        const value = event.target.value;
        if (!regex.test(value) || value.leght > 8) {
            event.target.value = value.substr(0, value.leght - 1);
        }

        this.setState({
            telefono: event.target.value
        })

        console.log(this.state);

    }

    validarGuardar = (cliente) => {

        if (cliente === null || cliente === undefined) {
            this.mostrarMensajeAdvertencia('No se ha pasado un objeto validado');
            return false;
        }

        if (cliente.noRuc === null || cliente.noRuc.length < 16) {
            this.mostrarMensajeAdvertencia('Ruc:requerida', 'Se require un nuemro Ruc valido');
            return false;
        }

        if (cliente.nombre === null || cliente.nombre.length == 0) {
            this.mostrarMensajeAdvertencia('Nombre:requerida', 'Se require el Nombre');
            return false;
        }

        if (cliente.telefono === null || cliente.telefono.length == 0) {
            this.mostrarMensajeAdvertencia('Telefono:requerida', 'Se require el Telefono');
            return false;
        }

        if (cliente.correo === null || cliente.correo.length == 0) {
            this.mostrarMensajeAdvertencia('Correo:requerida', 'Se require el Correo');
            return false;
        }

        if (cliente.direccion === null || cliente.direccion.length == 0) {
            this.mostrarMensajeAdvertencia('Direccion:requerida', 'Se require la Direccion');
            return false;
        }

        if (cliente.activo === null || cliente.activo.length == 0) {
            this.mostrarMensajeAdvertencia('Estado:requerida', 'Se require la D');
            return false;
        }

    }



    ToRender() {
        return (
          

                <div className="container m-0">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputNumber id="itRuc"
                                    value={this.state.noRuc}
                                    onValueChange={(e) => this.setState({ noRuc: e.target.value })} />

                                <label htmlhtmlFor="itRuc" style={{ fontSize: '0.8em' }}>Numero Ruc</label>
                            </spa>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itNombre"
                                    value={this.state.nombre}
                                    onChange={(e) => this.setState({ nombre: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itNombre" style={{ fontSize: '0.8em' }}>Nombre</label>
                            </spa>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4" >
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itTelefono"
                                    value={this.state.telefono}
                                    onChange={(e) => this.setState({ telefono: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itTelefono" style={{ fontSize: '0.8em' }}>Telefono</label>
                            </spa>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4" >
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itCorreo"
                                    value={this.state.correo}
                                    onChange={(e) => this.setState({ correo: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itCorreo" style={{ fontSize: '0.8em' }}>Correo</label>
                            </spa>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: '1.3em' }}>
                            <span>
                                <InputTextarea id="itaDireccion" autoResize={true}
                                    value={this.state.direccion}
                                    onChange={(e) => this.setState({ direccion: e.target.value })}
                                    autoResize={true}
                                />
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                            <label htmlhtmlFor="cbEstado" style={{ fontSize: '0.8em' }}>Estado</label>
                        </div>
                        <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                            <Checkbox id='cbEstado' onChange={e => this.setState({ activo: e.checked })}
                                checked={this.state.activo} />
                        </div>
                    </div>
                </div>
        
        );
    }


}