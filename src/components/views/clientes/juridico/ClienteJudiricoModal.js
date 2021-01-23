import React, { Fragment } from 'react';
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

export default class ClienteJuridicoModal extends React.Component {

    constructor() {
        super();
        this.state = {
            visible: true
        }
        this.onHide = this.onHide.bind(this);
        this.onYesClick = this.onYesClick.bind(this);
    }

    onHide = () => {
        this.setState({
            visible: true
        });
    }

    onYesClick = () => {
        alert('Sin funcionalidad . Trabajando en ello')
    }

    renderFooter = () => {
        return (
            <div style={{ marginTop: '1em' }}>
                <Button label="No" icon="pi pi-times" onClick={this.onHide} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={this.onYesClick} autoFocus />
            </div>
        )
    }

    render() {
        return (
            <Dialog className="p-dialog" role="alert"
                header={"Persona Juridico"}
                position="top-bottom"
                maximizable={true}
                visible={this.props.visible}
                style={{ width: '50vw' }}
                footer={this.renderFooter()}
                onHide={() => this.props.onHide()} >

                <div className="container m-0">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itRuc" />
                                <label htmlhtmlFor="itRuc" style={{ fontSize: '0.8em' }}>Numero Ruc</label>
                            </spa>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itNombre" />
                                <label htmlhtmlFor="itNombre" style={{ fontSize: '0.8em' }}>Nombre</label>
                            </spa>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4" >
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itTelefono" />
                                <label htmlhtmlFor="itTelefono" style={{ fontSize: '0.8em' }}>Telefono</label>
                            </spa>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-4" >
                            <spa className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputText id="itCorreo" />
                                <label htmlhtmlFor="itCorreo" style={{ fontSize: '0.8em' }}>Correo</label>
                            </spa>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: '1.3em' }}>
                            <span>
                            <InputTextarea id="itaDireccion" autoResize={true}/>
                            </span>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }


}