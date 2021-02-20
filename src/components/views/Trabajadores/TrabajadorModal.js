import { Dialog } from 'primereact/dialog';
import React, { Fragment, useState } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from 'primereact/tabview';
import { Validation } from "../../../util/validations/Validation"
import { CargoTrabajadorService } from "../../../services/Trabajadores/CargoTrabajadorService"
import { Tab } from 'bootstrap';
import { event } from 'jquery';
import GenericModal from '../modal/GenericModal';


export default class TrabajadorModal extends GenericModal {

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
            direccion: '',
            cargo: '',
            cargos: [],
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

    setTrabajador = (trabajador) => {
        console.log(trabajador)
        if (trabajador === undefined || trabajador === null) {
            this.setState({
                id: null,
                ncedula: null,
                codTrabajador: null,
                pnombre: null,
                snombre: null,
                papelli: null,
                sapelli: null,
                genero: null,
                estadoCivil: null,
                telefono: null,
                direccion: null,
                cargo: null,
                estado: true
            });
        } else {
            this.setState({
                id: trabajador.data.id,
                ncedula: trabajador.data.noCedula,
                codTrabajador: trabajador.data.codTrabajador,
                pnombre: trabajador.data.primerNombre,
                snombre: trabajador.data.segundoNombre,
                papelli: trabajador.data.primerApellido,
                sapelli: trabajador.data.segundoApellido,
                //genero: { name: trabajador.data.sexo },
                genero: { name: trabajador.data.sexo === 'M'? 'Masculino' : 'Femenino' },
                estadoC: { name: trabajador.data.estadoCivil },
                telefono: trabajador.data.telefono,
                direccion: trabajador.data.direccion,
                cargo: trabajador.data.cargo,
                estado: trabajador.data.estado
            }
            );
        }
    }

    getTrabajador = () => {

        if (!this.validarguardar()) {
            return null;
        }
        const trabajador = {

            'noCedula': this.state.ncedula,
            'codTrabajador': this.state.codTrabajador,
            'primerNombre': this.state.pnombre,
            'segundoNombre': this.state.snombre,
            'primerApellido': this.state.papelli,
            'segundoApellido': this.state.sapelli,
            'sexo': this.state.genero !== null ? this.state.genero.name === 'Masculino' ? 'M' : 'F' : null,
            'estadoCivil': this.state.estadoC !== null ? this.state.estadoC.name : null,
            'telefono': this.state.telefono,
            'direccion': this.state.direccion,
            'cargo': this.state.cargo,
            'estado': this.state.estado
        }

        if (this.state.id !== undefined && this.state.id > 0) {
            trabajador.id = this.state.id
        }
        return trabajador;
    }

    validateTelefono = (event) => {
        const str = /^[2|5|7|8]\d{0,7}/g;
        const regex = new RegExp(str);
        const value = event.target.value;

        if (!regex.test(value) || value.length > 8) {
            event.target.value = value.substr(0, value.length - 1);
        }

        this.setState({
            telefono: event.target.value
        })

        console.log(this.state)
    }

    validateCedula = (event) => {
        const regex = new RegExp(Validation.regexNoCedula);
        const value = event.target.value;

        if (value.length > 16) {
            event.target.value = value.substr(0, value.length - 1);
            // event.target.classList.add('p-invalid');
        }

        this.setState({
            ncedula: event.target.value
        })

    }

    componentDidMount() {

        new CargoTrabajadorService().getAll().then(response => {
            console.log(response)
            this.setState({
                cargos: response
            });
        }).catch(e => {

            this.mostrarMensajeError('Acceso denegado', e.message);
        });

    }

    validarguardar() {

        if (this.state.noCedula === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.codTrabajador === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.pnombre === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }


        if (this.state.snombre === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.papelli === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.sapelli === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.telefono === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.estadoC === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.sexo === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.cargos === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        if (this.state.direccion === null) {
            this.mostrarMensajeAdvertencia('No se ha pasado un parametro valido');
            return false;
        }

        return true;
    }

    toRender = () => {
        return (

            <div className="container m-0">

                <TabView >

                    <TabPanel header={'Datos Personas'}>


                        <div className="row">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itPrimerNombre"
                                        value={this.state.pnombre}
                                        onChange={(e) => this.setState({ pnombre: e.target.value })}
                                        keyfilter={/[^\s]/}
                                    />
                                    <label htmlhtmlFor="itPrimerNombre" style={{ fontSize: '0.8em' }}>Primer Nombre</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itSegundoNombre"
                                        value={this.state.snombre}
                                        onChange={(e) => this.setState({ snombre: e.target.value })}
                                        keyfilter={/[^\s]/}
                                    />
                                    <label htmlhtmlFor="itSegundoNombre" style={{ fontSize: '0.8em' }}>Segundo Nombre</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itPrimerApellido"
                                        value={this.state.papelli}
                                        onChange={(e) => this.setState({ papelli: e.target.value })}
                                        keyfilter={/[^\s]/}
                                    />
                                    <label htmlhtmlFor="itPrimerApellido" style={{ fontSize: '0.8em' }}>Primer Apellido</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itSegundoApellido"
                                        value={this.state.sapelli}
                                        onChange={(e) => this.setState({ sapelli: e.target.value })}
                                        keyfilter={/[^\s]/}
                                    />
                                    <label htmlhtmlFor="itSegundoApellido" style={{ fontSize: '0.8em' }}>Segundo Apellido</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itTelefono"
                                        value={this.state.telefono}
                                        onChange={(e) => this.validateTelefono(e)}

                                    />
                                    <label htmlhtmlFor="itTelefono" style={{ fontSize: '0.8em' }}>Telefono</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputText id="itCedula"
                                        value={this.state.ncedula}
                                        onChange={(e) => this.setState({ ncedula: e.target.value })}
                                        keyfilter={/[^\s]/}
                                    />
                                    <label htmlhtmlFor="itCedula" style={{ fontSize: '0.8em' }}>Numero de Cedula</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                <Dropdown value={this.state.genero}
                                    onChange={(e) => this.setState({ genero: e.target.value })}
                                    options={[{ name: 'Masculino' }, { name: 'Femenino' }]} 
                                    optionLabel="name" placeholder="Genero" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                <Dropdown value={this.state.estadoC}
                                    onChange={(e) => this.setState({ estadoC: e.target.value })}
                                    options={[{ name: 'Soltero' }, { name: 'Casado' }]} 
                                    optionLabel="name" placeholder="Estado Civil" />
                            </div>

                        </div>

                    </TabPanel>

                    <TabPanel header={'Datos del Empleado'}>

                        <div className="row">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                    <InputNumber id="itCodigoTrabajador"
                                        value={this.state.codTrabajador}
                                        
                                        max = {99999}
                                        onChange={(e) => this.setState({ codTrabajador: e.value })}
                                     
                                    />
                                    <label htmlhtmlFor="itCodigoTrabajador" style={{ fontSize: '0.8em' }}>Codigo del Trabajador</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                <Dropdown value={this.state.cargo}
                                    onChange={(e) => this.setState({ cargo: e.target.value })}
                                    options={this.state.cargos} optionLabel="nombreCargo" placeholder="Cargo" />
                            </div>


                        </div>

                        <div className="row">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: '1.3em' }}>
                                <span className="p-float-label">
                                    <InputTextarea id='itaDireccion' value={this.state.direccion} onChange={(e) => this.setState({ direccion: e.target.value })} autoResize={true} />
                                    <label htmlhtmlFor="itaDireccion">Direccion</label>
                                </span>
                            </div>

                        </div>

                    </TabPanel>

                </TabView >

                <div className="row">

                    <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                        <label htmlhtmlFor="itEstado" style={{ fontSize: '0.8em' }}>Estado
                          </label>
                    </div>

                    <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                        <Checkbox id='itEstado'
                            onChange={e => this.setState({ estado: e.checked })}
                            checked={this.state.estado} />
                    </div>

                </div>

            </div>


        );
    }

}