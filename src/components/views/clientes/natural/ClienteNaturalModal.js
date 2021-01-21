import React, {Fragment} from 'react';
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
            visible : false
        }
    }

    onHide = () => {
        this.setState({
            visible : false
        });
    }

    clienteNaturalBody = () => {
        console.log('hola desde el body');
        return (
            <Fragment />

        );
    }

    renderFooter = () => {
        return (
            <div style={{marginTop: '1em'}}>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClickYesButton} autoFocus/>
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
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itCedula"  />
                                    <label htmlhtmlFor="itCedula" style={{fontSize: '0.8em'}}>Numero de Cedula</label>
                                </span>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itPrimerNombre" />
                                    <label htmlhtmlFor="itPrimerNombre" style={{fontSize: '0.8em'}}>Primer Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itSegundoNombre" />
                                    <label htmlhtmlFor="in" style={{fontSize: '0.8em'}}>Segundo Nombre</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itPrimerApellido"  />
                                    <label htmlhtmlFor="itPrimerApellido" style={{fontSize: '0.8em'}}>Primer Apellido</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3 " style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itSegundoApellido" />
                                    <label htmlhtmlFor="itSegundoApellido" style={{fontSize: '0.8em'}}>Segundo Apellido</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">

                        </div>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown options={[{name: 'Masculino'}, {name: 'Femenino'}]} optionLabel="name" placeholder="Genero" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <Dropdown options={[{name: 'Soltero'}, {name: 'Casado'}]} optionLabel="name" placeholder="Estado Civil" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itTelefono" />
                                    <label htmlhtmlFor="itTelefono" style={{fontSize: '0.8em'}}>Telefono</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-3" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputText id="itCorreo" />
                                    <label htmlhtmlFor="itCorreo" style={{fontSize: '0.8em'}}>Correo</label>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop:'1.3em'}}>
                                <span className="p-float-label">
                                    <InputTextarea id='itaDireccion' autoResize={true}/>
                                    <label htmlhtmlFor="itaDireccion">Direccion</label>
                                </span>
                            </div>
                        </div>
                    </div>
            </Dialog>
        );
    }
}