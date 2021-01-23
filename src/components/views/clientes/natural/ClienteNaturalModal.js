import React, {Fragment, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";

export default class ClienteNaturalModal extends React.Component{

    constructor() {
        super();
        this.state = {
            visible : true,
            ncedula : '',
            pnombre : '',
            snombre : '',
            papelli : '',
            sapelli : '',
            genero : '',
            estadoC : '',
            telefono: '',
            correo : '',
            direcicon : ''
        }

        this.onHide = this.onHide.bind(this);
        this.onYesClick = this.onYesClick.bind(this);
    }

    onHide = () => {
        this.setState({
            visible : true
        });
    }

    onYesClick = () => {
        console.log(this.state)
        alert('Sin funcionalidad. Estamos trabajando en las nuevas opciones!!')
    }


    renderFooter = () => {
        return (
            <div style={{marginTop: '1em'}}>
                <Button label="No" icon="pi pi-times" onClick={this.onHide} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={this.onYesClick} autoFocus/>
            </div>
        );
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
                                    <InputText id="itCedula" onChange={(e) => this.setState({ncedula : e.target.value})} />
                                    <label htmlhtmlFor="itCedula" style={{fontSize: '0.8em'}}>Numero de Cedula</label>
                                </span>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itPrimerNombre" onChange={(e) => this.setState({pnombre : e.target.value})}  />
                                    <label htmlhtmlFor="itPrimerNombre" style={{fontSize: '0.8em'}}>Primer Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itSegundoNombre" onChange={(e) => this.setState({snombre : e.target.value})}  />
                                    <label htmlhtmlFor="in" style={{fontSize: '0.8em'}}>Segundo Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itPrimerApellido" onChange={(e) => this.setState({papelli : e.target.value})}  />
                                    <label htmlhtmlFor="itPrimerApellido" style={{fontSize: '0.8em'}}>Primer Apellido</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3 " style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itSegundoApellido" onChange={(e) => this.setState({sapelli : e.target.value})} />
                                    <label htmlhtmlFor="itSegundoApellido" style={{fontSize: '0.8em'}}>Segundo Apellido</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown onChange={(e) => this.setState({genero : e.target.value})} options={[{name: 'Masculino'}, {name: 'Femenino'}]} optionLabel="name" placeholder="Genero" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown onChange={(e) => this.setState({estadoC : e.target.value})}  options={[{name: 'Soltero'}, {name: 'Casado'}]} optionLabel="name" placeholder="Estado Civil" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itTelefono" onChange={(e) => this.setState({telefono : e.target.value})}/>
                                    <label htmlhtmlFor="itTelefono" style={{fontSize: '0.8em'}}>Telefono</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itCorreo" onChange={(e) => this.setState({correo : e.target.value})}/>
                                    <label htmlhtmlFor="itCorreo" style={{fontSize: '0.8em'}}>Correo</label>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputTextarea id='itaDireccion' onChange={(e) => this.setState({direcicon : e.target.value})} autoResize={true}/>
                                    <label htmlhtmlFor="itaDireccion">Direccion</label>
                                </span>
                            </div>
                        </div>
                    </div>
            </Dialog>
        );
    }
}