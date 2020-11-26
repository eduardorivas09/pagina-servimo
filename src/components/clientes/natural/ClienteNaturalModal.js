import React from 'react';
import setting from "../../../ApiSetting.json";

export default class ClienteNaturalModal extends React.Component {

    constructor() {
        super();
        this.saveData = this.saveData.bind(this);
        this.state = {
            cedula : "",
            pnombre : "",
            snombre : "",
            papellido : "",
            sapellido : "",
            genero : "",
            estadoCivil : "",
            telefono : "",
            correo : "",
            direccion : ""
        }
    }

    getObject(){
        this.props.object.forEach((c, index) => {
            this.setState({
                cedula : c.noCedula,
                pnombre : c.primerNombre,
                snombre :c.segundoNombre,
                papellido : c.primerApellido,
                sapellido : c.segundoApellido,
                genero : c.sexo,
                estadoCivil :c.estadoCivil,
                telefono : c.telefono,
                correo : c.correo,
                direccion : c.direccion
            })
        });

        console.log(this.state.cedula);

        return this.props.object;
    }

    saveData(){
        // this.setState({
        //     cedula : document.getElementById('recipient-noCedula').value,
        //     pnombre : document.getElementById('recipient-noCedula').value,
        //     snombre :document.getElementById('recipient-noCedula').value,
        //     papellido : document.getElementById('recipient-noCedula').value,
        //     sapellido : document.getElementById('recipient-noCedula').value,
        //     genero : document.getElementById('recipient-noCedula').value,
        //     estadoCivil :document.getElementById('recipient-noCedula').value,
        //     telefono : document.getElementById('recipient-noCedula').value,
        //     correo : document.getElementById('recipient-noCedula').value,
        //     direccion : document.getElementById('recipient-noCedula').value
        // })

        let cedula = document.getElementById("recipient-noCedula").value;
        let pnombre = document.getElementById("recipient-pnombre").value;
        let snombre = document.getElementById("recipient-snombre").value;
        let papellido = document.getElementById("recipient-papellido").value;
        let sapellido = document.getElementById("recipient-sapellido").value;
        let genero = document.getElementById("cbGenero");
        genero = genero.options[genero.selectedIndex].value;
        let estadoCivil = document.getElementById("cbEstado");
        estadoCivil = estadoCivil[estadoCivil.selectedIndex].value;
        let telefono = document.getElementById("recipient-telefono").value;
        let correo = document.getElementById("recipient-email").value;
        let direccion = document.getElementById("recipient-direccion").value;

        let url = setting.url + "clientes/natural/"
        
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': ''
                },
                body: JSON.stringify({
                    primerNombre: pnombre,
                    segundoNombre: snombre,
                    primerApellido: papellido,
                    segundoApellido: sapellido,
                    noCedula: cedula,
                    edad: 0,
                    sexo: genero.charAt(0),
                    estadoCivil: estadoCivil,
                    telefono: telefono,
                    correo: correo,
                    direccion:direccion
                })
            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
            })
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cliente Juridico</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="recipient-noCedula"
                                               placeholder="Numero de Cedula" /></div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="recipient-pnombre"
                                               placeholder="Primer Nombre" value={this.props.object.primerNombre}/>
                                        <input type="text" className="form-control" id="recipient-snombre"
                                               placeholder="Segundo Nombre" value={this.props.object.segundoNombre}/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="recipient-papellido"
                                               placeholder="Primer Apellido" value={this.props.object.primerApellido}/>
                                        <input type="text" className="form-control" id="recipient-sapellido"
                                               placeholder="Segundo Apellido" value={this.props.object.segundoApellido}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select class="form-control" id="cbGenero">
                                            <option value="" disabled selected>Genero</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>

                                        <select class="form-control" id="cbEstado">
                                            <option value="" disabled selected>Estado Civil</option>
                                            <option value="Casado">Soltero</option>
                                            <option value="Soltero">Casado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="recipient-telefono"
                                           placeholder="Telefono" value={this.props.object.telefono}/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="recipient-email"
                                           placeholder="Correo" value={this.props.object.correo}/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" id="recipient-direccion" placeholder="Direccion">{this.props.object.direccion}</textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveData}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}