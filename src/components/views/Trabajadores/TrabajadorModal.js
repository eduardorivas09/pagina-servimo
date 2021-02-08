import { Dialog } from 'primereact/dialog';
import React, { Fragment, useState } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from 'primereact/tabview';
import { Validation } from "../../../util/validations/Validation"
import { CargoTrabajadorService } from "../../../services/Trabajadores/CargoTrabajadorService"
import { Tab } from 'bootstrap';
import { event } from 'jquery';


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
            //  correo: '',
            direccion: '',
            cargo: '',
            cargos: [],
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
                codTrabajador: null,
                // foto: null,
                pnombre: null,
                snombre: nul,
                papelli: null,
                sapelli: null,
                genero: null,
                estadoCivil: null,
                telefono: null,
                //correo: null,
                direccion: null,
                cargo: null,
                activo: true
            });
        } else {
            this.setState({
                id: trabajador.data.id,
                ncedula: trabajador.data.noCedula,
                codTrabajador: trabajador.data.codTrabajador,
                //foto: trabajador.data.foto,
                pnombre: trabajador.data.primerNombre,
                snombre: trabajador.data.segundoNombre,
                papelli: trabajador.data.primerApellido,
                sapelli: trabajador.data.segundoApellido,
                genero: { name: trabajador.data.sexo === 'M' ? 'Masculino ' : 'Femenino' },
                estadoCivil: { name: trabajador.data.estadoCivil },
                telefono: trabajador.data.telefono,
                //correo: trabajador.data.correo,
                direccion: trabajador.data.direccion,
                cargo: trabajador.data.cargo,
                activo: trabajador.data.activo
            }
            );
        }
    }

    getTrabajador = () => {
        const trabajador = {

            'noCedula': this.state.ncedula,
            'codTrabajador': this.state.codTrabajador,
            'primerNombre': this.state.pnombre,
            'segundoNombre': this.state.snombre,
            'primerApellido': this.state.papelli,
            'segundoApellido': this.state.sapelli,
            'sexo': this.state.genero !== null ? this.state.genero.name === 'Maculino' ? 'M' : 'F' : null,
            'estadoCivil': this.state.estadoC !== null ? this.state.estadoC.name : null,
            'telefono': this.state.telefono,
            //'correo': this.state.correo,
            'direccion': this.state.direccion,
            'cargo': this.state.cargos,
            'activo': this.state.activo
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

    render() {
        return (
            <Dialog className='p-dialog' role='alert'
                header={"Trabajador"}
                position="top-bottom"
                maximizable={true}
                visible={this.props.visible}
                style={{ width: '50vw' }}
                footer={this.renderFooter()}
                onHide={() => this.props.onHide()}>

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



                                <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                    <Dropdown value={this.state.genero}
                                        onChange={(e) => this.setState({ genero: e.target.value })}
                                        options={[{ name: 'Masculino' }, { name: 'Femenino' }]} optionLabel="name" placeholder="Genero" />
                                </div>

                                <div className="col col-12 col-sm-12 col-md-12 col-lg-6" style={{ marginTop: '1.3em' }}>
                                    <Dropdown value={this.state.estadoC}
                                        onChange={(e) => this.setState({ estadoC: e.target.value })}
                                        options={[{ name: 'Soltero' }, { name: 'Casado' }]} optionLabel="name" placeholder="Estado Civil" />
                                </div>


                            </div>

                        </TabPanel>

                        <TabPanel header={'Datos del Empleado'}>

                            <div className="row">

                                <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                    <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                        <InputText id="itCodigoTrabajador"
                                            value={this.state.codTrabajador}
                                            onChange={(e) => this.setState({ codTrabajador: e.target.value })}
                                            keyfilter={/[^\s]/}
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
                            <label htmlhtmlFor="cbEstado" style={{ fontSize: '0.8em' }}>Estado
                          </label>
                        </div>

                        <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                            <Checkbox id='cbEstado'
                                onChange={e => this.setState({ activo: e.checked })}
                                checked={this.state.activo} />
                        </div>

                    </div>

                </div>

            </Dialog>



        );
    }

}