import { Dialog } from 'primereact/dialog';
import React, { Fragment, useState } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import {  Dropdown} from "primereact/dropdown";
import { Validation } from "../../../util/validations/Validation"

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
                pnombre: trabajador.data.primerNombre,
                snombre: trabajador.data.segundoNombre,
                papelli: trabajador.data.primerApellido,
                sapelli: trabajador.segundoApellido,
                genero: { name: trabajador.data.sexo === 'M' ? 'Masculino ' : 'Femenino' },
                estadoC: { name: trabajador.data.estadoC },
                telefono: trabajador.data.telefono,
                correo: trabajador.data.correo,
                direccion: trabajador.data.direccion,
                cargo: { name: trabajador.data.cargo },
                activo: trabajador.data.activo
            }
            );
        }
    }

    getTrabajador = () => {
        const trabajador = {

            'noCedula': this.state.ncedula,
            'codTrabajado': this.state.codTrabajado,
            'primerNombre': this.state.pnombre,
            'segundoNombre': this.state.snombre,
            'primerApellido': this.state.papelli,
            'segundoApellido': this.state.sapelli,
            'sexo': this.state.genero !== null ? this.state.genero.name === 'Maculino' ? 'M' : 'F' : null,
            'estadoC': this.state.estadoC !== null ? this.state.estadoC.name : null,
            'telefono': this.state.telefono,
            'correo': this.state.correo,
            'direccion': this.state.direccion,
            'cargo': this.state.correo,
            'activo': this.state.activo
        }

        if (this.state.id !== undefined && this.state.id > 0) {
            trabajador.id = this.state.id
        }
        return trabajador;
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

                 
                <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{ marginTop: '1.3em' }}>
                            <Dropdown value={this.state.cargo} 
                            onChange={(e) => this.setState({cargo: e.target.value })} 
                            options={[{ name: 'Vigilante' }, { name: 'Limpieza' }]} optionLabel="name" placeholder="Cargo" />
                        </div>


                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itCodigoTrabajador"
                                    value={this.state.codTrabajado}
                                    onChange={(e) => this.setState({ codTrabajado: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itCodigoTrabajador" style={{ fontSize: '0.8em' }}>Codigo del Trabakador</label>
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itNombre"
                                    value={this.state.primerNombre}
                                    onChange={(e) => this.setState({ primerNombre: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itNombre" style={{ fontSize: '0.8em' }}>Nombre</label>
                            </span>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itApellido"
                                    value={this.state.primerApellido}
                                    onChange={(e) => this.setState({ primerApellido: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itApellido" style={{ fontSize: '0.8em' }}>Apellido</label>
                            </span>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itTelefono"
                                    value={this.state.telefono}
                                    onChange={(e) => this.setState({ telefono: e.target.value })}
                                    keyfilter={/[^\s]/}
                                />
                                <label htmlhtmlFor="itTelefono" style={{ fontSize: '0.8em' }}>Telefono</label>
                            </span>
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


                </div>

            </Dialog>



        );
    }

}