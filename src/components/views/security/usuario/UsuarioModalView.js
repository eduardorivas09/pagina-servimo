
import React from "react";
import GenericModal from "../../modal/GenericModal";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Dropdown} from "primereact/dropdown";
import {Checkbox} from "primereact/checkbox";
import { Avatar } from 'primereact/avatar';
import userImage from '../../../../static/img/talin.JPG';
import {RoleService} from "../../../../services/seguridad/RoleService";
import $ from 'jquery';

/**
 * @author Josue Reyes
 * @class UsuarioModalView
 * @since 1.0, 5/02/2021
 *
 * Clase que proporciona las funcionalidaes de gestionar a los usuarios de una manera
 * visual. Agregar y editar.
 */
export default class UsuarioModalView extends GenericModal{

    /**
     * Constructor de la clase
     */
    constructor() {
        super();
        this.state = {
            userName: null,
            password: null,
            confirmPass: null,
            rol: null,
            activo : true,
            roles: []
        }
    }

    loadRoles = () => {
        if (!this.props.readOnly) {
            new RoleService().getAll().then(response => {
                console.log(response)
                this.setState({
                    roles: response
                });
            }).catch(e => {
                if (e instanceof Error && !this.props.readOnly){
                    this.mostrarMensajeError('Acceso denegado', e.message);
                }
            });
        }

    }

    /**
     * @since 1.0
     *
     * Settea un cliente para ser cargado y mostrado.
     * @param user objeto usuario.
     */
    setUser = (user) => {
        if (user === undefined || user === null){
            this.setState({
                id: null,
                userName: null,
                password: null,
                confirmPass: null,
                rol: null,
                activo : true,
            })
        }else {
            this.setState({
                id: user.data === undefined ? user.id : user.data.id,
                userName: user.data === undefined ? user.userName : user.data.userName,
                password: '***************',
                confirmPass: '***************',
                rol: user.data === undefined ? user.rol : user.data.rol,
                activo : user.data === undefined ? user.activo : user.data.activo,
            })
        }



    }

    /**
     * @since 1.0
     *
     * Metodo que retorna el usuario que se esta agregando o editando.
     * @returns {{id: *, userName: null|*, rol: null|*, activo: boolean}}
     */
    getUser = () => {
        if (this.validar()){
            const user = {
                'id': this.state.id,
                'userName': this.state.userName,
                'password': this.state.password,
                'rol': this.state.rol,
                'activo': this.state.activo
            };

            if (this.state.id !== undefined && this.state.id > 0) {
                user.id = this.state.id;
            }
            return user;
        }
        return null;
    }

    validar = () => {
        if (this.state.rol === null || this.state.rol === undefined) {
            this.mostrarMensajeAdvertencia("Se debe seleccionar un rol")
            $('dropRol').focus();
            return false;
        }

        if (this.state.userName === null || this.state.userName.length < 6) {
            this.mostrarMensajeAdvertencia("El nombre de usuario debe tener almenos 6 caracteres")
            $('itUserName').focus();
            return false;
        }
        if (this.state.password === null || this.state.password.length < 6) {
            this.mostrarMensajeAdvertencia("La contraseña debe tener almenos 8 caracteres.")
            $('itPassword').focus();
            return false;
        }

        if (this.state.confirmPass === null || this.state.confirmPass.length < 6) {
            this.mostrarMensajeAdvertencia("Se debe confirmar la contraseña");
            $('itConfirmPassword').focus();
            return false;
        }

        if (this.state.confirmPass !== this.state.confirmPass) {
            this.mostrarMensajeAdvertencia("Las contraseñas no coinciden.");
            $('itPassword').focus();
            return false;
        }

        if ((this.state.password.match(new RegExp("\\*", "g")) || []).length > 1){
            this.state.password = null;
        }

        return true;

    }

    componentDidMount() {
        this.loadRoles();
    }

    /**
     * @since 1.0
     *
     * Sobrecarga del metodo {@code toRender} para mostrar sus datos.
     * @returns {JSX.Element} vista.
     */
    toRender = () => {
        return (
            <div className="container">

                <div className="row">
                    <div className="col col-lg-6" >
                        <div className="p-d-flex p-flex-column">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop:'1.3em'}}>
                                <Dropdown value={this.state.rol}
                                          id='dropRol'
                                          disabled={this.props.readOnly}
                                          onChange={(e) => this.setState({rol : e.target.value})}
                                          options={this.state.roles}
                                          optionLabel="rol"
                                          placeholder="Rol" />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12  mt-1">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <InputText id="itUserName"
                                               value={this.state.userName}
                                               onChange={(e) => this.setState({userName : e.target.value})}
                                               keyfilter={/[^\s]/}/>
                                    <label htmlhtmlFor="itUserName" style={{fontSize: '0.8em'}}>Nombre de usuario</label>
                                </span>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12  mt-1">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <Password id="itPassword"
                                              value={this.state.password}
                                              onChange={(e) => this.setState({password : e.target.value})}
                                              toggleMask/>
                                    <label htmlhtmlFor="itPassword" style={{fontSize: '0.8em'}}>Contraseña</label>
                                </span>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12  mt-1">
                                <span className="p-float-label" style={{marginTop:'1.3em'}}>
                                    <Password id="itConfirmPassword"
                                              value={this.state.confirmPass}
                                              onChange={(e) => this.setState({confirmPass : e.target.value})}
                                              feedback={false}/>
                                    <label htmlhtmlFor="itConfirmPassword" style={{fontSize: '0.8em'}}>Confirmar Contraseña</label>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col col-lg-6">
                            <div className="card" style={{border: 'none', textAlign: 'center'}}>
                                <Avatar image={userImage}
                                        style={{marginLeft: 'auto', marginRight: 'auto', width: '5em', height: '5em'}}
                                        size="xlarge"
                                        shape="circle" />
                                <h5 className='mt-2'>{this.state.userName}</h5>
                            </div>

                        <div className="col col-12 col-sm-4 col-md-2 col-lg-5">
                            <label htmlhtmlFor="cbEstado" style={{fontSize: '0.8em', marginTop: '2em'}}>Estado</label>
                            <Checkbox
                                id='cbEstado'
                                disabled={this.props.readOnly}
                                onChange={e => this.setState({activo: e.checked})}
                                checked={this.state.activo} style={{marginLeft: '1em'}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}