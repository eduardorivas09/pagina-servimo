import {GenericView} from "../../GenericView";
import {Button} from "primereact/button";
import React from "react";
import {Dialog} from "primereact/dialog";
import GenericModal from "../../modal/GenericModal";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Dropdown} from "primereact/dropdown";
import {Checkbox} from "primereact/checkbox";
import { Avatar } from 'primereact/avatar';
import userImage from '../../../../static/img/talin.JPG';

export default class UsuarioModalView extends GenericModal{

    constructor() {
        super();
        this.state = {
            userName: null,
            password: null,
            rol: null,
            activo : true
        }
    }

    toRender = () => {
        return (
            <div className="container m-0">
                {/*<div className="p-d-flex p-jc-between">*/}
                    <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="p-d-flex p-flex-column">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itUserName"
                                               value={this.state.userName}
                                               onChange={(e) => this.setState({userName : e.target.value})}
                                               keyfilter={/[^\s]/}/>
                                    <label htmlhtmlFor="itUserName" style={{fontSize: '0.8em'}}>Nombre de usuario</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <Password id="itPassword"
                                              value={this.state.password}
                                              onChange={(e) => this.setState({password : e.target.value})}/>
                                    <label htmlhtmlFor="itPassword" style={{fontSize: '0.8em'}}>Contrasenha</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop:'1.3em'}}>
                                <Dropdown value={this.state.rol} onChange={(e) => this.setState({rol : e.target.value})} options={[{name: 'Masculino'}, {name: 'Femenino'}]} optionLabel="name" placeholder="Rol" />
                            </div>

                            <div className="col col-12 col-sm-4 col-md-2 col-lg-5">
                                <label htmlhtmlFor="cbEstado" style={{fontSize: '0.8em'}}>Estado</label>
                            </div>
                            <div className="col col-12 col-sm-4 col-md-2 col-lg-12">
                                <Checkbox id='cbEstado' onChange={e => this.setState({activo: e.checked})} checked={this.state.activo}/>
                            </div>
                        </div>
                    </div>

                    <div className="col col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="card">
                            <Avatar image={userImage}
                                    size="xlarge"
                                    shape="circle" />
                            <h5>Username</h5>
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        );
    }


}