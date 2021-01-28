import React, {Fragment, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {Checkbox} from "primereact/checkbox";

export default class ClienteNaturalModal extends React.Component{

    constructor() {
        super();
        this.state = {
            id: -1,
            ncedula : '',
            pnombre : '',
            snombre : '',
            papelli : '',
            sapelli : '',
            genero : '',
            estadoC : '',
            telefono: '',
            correo : '',
            direccion : '',
            activo: ''
        }
    }

    renderFooter = () => {
        return (
            <div style={{marginTop: '1em'}}>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClickYesButton} autoFocus/>
            </div>
        );
    }

    setCliente = (cliente) => {

        if (cliente === undefined || cliente === null){
            this.setState({
                id : null,
                ncedula : null,
                pnombre : null,
                snombre : null,
                papelli : null,
                sapelli : null,
                genero : null,
                estadoC : null,
                telefono: null,
                correo : null,
                direccion : null,
                activo: true
            });
        }else{
            this.setState({
                id : cliente.data.id,
                ncedula : cliente.data.noCedula,
                pnombre : cliente.data.primerNombre,
                snombre : cliente.data.segundoNombre,
                papelli : cliente.data.primerApellido,
                sapelli : cliente.data.segundoApellido,
                genero : {name : cliente.data.sexo === 'M' ? 'Masculino' : 'Femenino'},
                estadoC : {name: cliente.data.estadoCivil},
                telefono: cliente.data.telefono,
                correo : cliente.data.correo,
                direccion : cliente.data.direccion,
                activo: cliente.data.activo
            });
        }


    }

    getCliente = () => {
        // if (this.state.id > 0){
            const cliente = {
                'estadoCivil': this.state.estadoC !== null ? this.state.estadoC.name : null ,
                'noCedula' : this.state.ncedula ,
                'primerNombre': this.state.pnombre ,
                'primerApellido' : this.state.papelli ,
                'segundoApellido' : this.state.sapelli ,
                'segundoNombre' : this.state.snombre ,
                'sexo' : this.state.genero !== null ? this.state.genero.name === 'Masculino' ? 'M' : 'F' : null,
                'telefono': this.state.telefono,
                'correo' : this.state.correo,
                'direccion' : this.state.direccion,
                'activo' : this.state.activo
            // }
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
        // console.log(event.target.value);
        // console.log(regex.test(event.target.value));

        if (!regex.test(value) || value.length > 8) {
            event.target.value = value.substr(0, value.length - 1);
            // event.target.classList.add('p-invalid');
        }
        // }else{
        //     event.target.classList.remove('p-invalid');
        // }

        this.setState({
            telefono: event.target.value
        })

        console.log(this.state)
    }


    render() {
        return (
            <Dialog  className="p-dialog" role="alert"
                     header={"Persona Natural"}
                     position="top-bottom"
                     maximizable={true}
                     visible={this.props.visible}
                     style={{ width: '50vw' }}
                     footer={this.renderFooter()}
                     onHide={() => this.props.onHide()} >

                    <div className="container m-0">
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itCedula"
                                               value={this.state.ncedula}
                                               onChange={(e) => this.setState({ncedula : e.target.value})}
                                               keyfilter={/[^\s]/}/>
                                    <label htmlhtmlFor="itCedula" style={{fontSize: '0.8em'}}>Numero de Cedula</label>
                                </span>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itPrimerNombre"
                                               value={this.state.pnombre}
                                               onChange={(e) => this.setState({pnombre : e.target.value})}
                                               keyfilter={/[^\s]/}  />
                                    <label htmlhtmlFor="itPrimerNombre" style={{fontSize: '0.8em'}}>Primer Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText
                                        id="itSegundoNombre"
                                        value={this.state.snombre}
                                        onChange={(e) => this.setState({snombre : e.target.value})}
                                        keyfilter={/[^\s]/} />
                                    <label htmlhtmlFor="in" style={{fontSize: '0.8em'}}>Segundo Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itPrimerApellido"
                                               value={this.state.papelli}
                                               onChange={(e) => this.setState({papelli : e.target.value})}
                                               keyfilter={/[^\s]/} />
                                    <label htmlhtmlFor="itPrimerApellido" style={{fontSize: '0.8em'}}>Primer Apellido</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3 " style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itSegundoApellido"
                                               value={this.state.sapelli}
                                               onChange={(e) => this.setState({sapelli : e.target.value})}
                                               keyfilter={/[^\s]/}/>
                                    <label htmlhtmlFor="itSegundoApellido" style={{fontSize: '0.8em'}}>Segundo Apellido</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown value={this.state.genero} onChange={(e) => this.setState({genero : e.target.value})} options={[{name: 'Masculino'}, {name: 'Femenino'}]} optionLabel="name" placeholder="Genero" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown value={this.state.estadoC} onChange={(e) => this.setState({estadoC : e.target.value})}  options={[{name: 'Soltero'}, {name: 'Casado'}]} optionLabel="name" placeholder="Estado Civil" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itTelefono"
                                               validateOnly={false}
                                               keyfilter={'pint'}
                                               value={this.state.telefono}
                                               onChange={(e) => this.validateTelefono(e)}/>
                                    <label htmlhtmlFor="itTelefono" style={{fontSize: '0.8em'}}>Telefono</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itCorreo"
                                               value={this.state.correo}
                                               keyfilter={'email'}
                                               onChange={(e) => this.setState({correo : e.target.value})}/>
                                    <label htmlhtmlFor="itCorreo" style={{fontSize: '0.8em'}}>Correo</label>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputTextarea id='itaDireccion' value={this.state.direccion} onChange={(e) => this.setState({direccion : e.target.value})} autoResize={true}/>
                                    <label htmlhtmlFor="itaDireccion">Direccion</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                                <label htmlhtmlFor="cbEstado" style={{fontSize: '0.8em'}}>Estado</label>
                            </div>
                            <div className="col col-12 col-sm-4 col-md-2 col-lg-1">
                                <Checkbox id='cbEstado' onChange={e => this.setState({activo: e.checked})} checked={this.state.activo}/>
                            </div>
                        </div>
                    </div>
            </Dialog>
        );
    }
}