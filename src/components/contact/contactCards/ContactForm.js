import React, {Fragment} from 'react';
import img1 from "../../../img/security.svg";
import img2 from "../../../img/planes.svg";
import img3 from "../../../img/gps.svg";
import img4 from "../../../img/recepcion.svg";
import img5 from "../../../img/acceso.jpg";
import img6 from "../../../img/alarma2.svg";


export default class ContactForm extends React.Component{

    render() {
        return (
            <Fragment>

                <h1>Dejame tu comentario</h1>
                        <form action="">
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className="form-control" id="nombre"
                                           placeholder="Ingrese su nombre"/>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="apellido">Apellido</label>
                                    <input type="text" class="form-control" id="apellido" placeholder="Ingrese su apellido"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Ingrese su email"/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="domicilio">Domicilio</label>
                                    <input type="text" className="form-control" id="domicilio"
                                           placeholder="Ingrese su domicilio"/>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="provincia">Provincia</label>
                                    <select name="" id="provincia" class="form-control">
                                        <option selected>Mangua</option>
                                        <option value="">Masaya</option>
                                        <option value="">Leon</option>
                                        <option value="">Chinandega</option>
                                        <option value="">Jinotepe</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comentario">Comentario</label>
                                <textarea name="" id="comentario" className="form-control" cols="30"
                                          rows="8"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                        <label className="form-check-label" htmlFor="gridCheck">Quiero que me contacten</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>

            </Fragment>
        );
    }
}