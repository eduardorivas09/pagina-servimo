import React from 'react';
import { Redirect } from 'react-router-dom'
import './login.css'
import logo from './../../../../static/img/Servimo.jpg';
import InputText from './../../../controls/field/input/text/InputText';
import SubmitButton from "../../../controls/button/submit/SubmitButton";
import {Session} from "../../../../services/seguridad/Session";
import DialogModal from "../../alerts/DialogModal";
import { useHistory } from "react-router-dom";
import {AuthenticationError} from "../../../../util/Error/AuthenticationError";

export default class Login extends React.Component{

    /**
     * Constructor del componente en el que se inicializan los estados del mismo.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,       //  Propiedad de tipo boolean que si es true la pagina se redirigira hacia el login.
            modalProps : {          //  Objeto que almacena las propiedades que contiene el modal de alerta.
                modalHeader : null, //  Cabecera del mensaje
                modalMessage : null,//  Cuerpo del mensaje.
                modalType : 'info', //  Tipo de modal, los tipos admitidos son info (default), warninng, success
                visible : false     //  Propiedad de tipo boolean que si es true el modal se muestra.
            }
        }

        this.onSignIn = this.onSignIn.bind(this);   //Bindeo obligatorio del evento de click en iniciar sesion.
        this.onHide = this.onHide.bind(this);       //Bindeo obligatorio del boton de cerrar el modal de alerta
        this.goToHome = this.goToHome.bind(this);
    }

    /**
     * Metodo de iniciar sesion que obtiene los valores digitados por el usuario y envia dichos datos al servidor.
     * Si los campos o alguno de ellos esta vacios no se realiza la peticion al servidor.
     * @param e evento
     * @returns {Promise<void>}
     */
   async onSignIn(e){
        e.preventDefault();
        const user = document.getElementsByName("user")[0].value;           //  Obtiene el nombre de usuario
        const pass = document.getElementsByName("pass")[0].value;           //  Obtiene la contrasenha
        if ((user !== null && user.length > 0) && (pass !== null && pass.length > 0)){
            let token = null;

            try {
                token = await new Session().initSession(user,pass);                //  Envia datos al servidor.
                if (await Session.isLogged()){
                    this.setState({redirect : true})                         //  Tras un logeo exitoso se redirige
                }
            }catch (e) {                                            //  Tras un error se muestra un mensaje.
                this.setState({
                    modalProps : {
                        modalHeader : 'Error al iniciar sesion',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            }
        }else{
            this.setState({
                modalProps : {
                    modalHeader : 'Login rechazado',
                    modalMessage : 'Se necesita un usuario y contraseña para iniciar. Sino tiene aun solicite una pronto',
                    modalType : 'warning',
                    visible : true
                }});
        }
    }

    /**
     * El metodo que oculta el modal cambiando el estado del mismo a visible false
     */
    onHide = () => {
        this.setState({
            modalProps : {
                visible : false
            }
        });
    }

    /**
     * Metodo que verifica si el usuario actualmente esta logeado
     * @returns {Promise<void>}
     */
    async isLogged(){
        try{
            if (await Session.isLogged()){
                this.setState({redirect : true})
            }
        }catch(e){
            this.setState({
                modalProps : {
                    modalHeader : 'Error del lado del servidor',
                    modalMessage : e.message,
                    modalType : 'warning',
                    visible : true
                }});
        }

    }

    /**
     * Tras el renderizado de la pagina el metodo de manejo del ciclo de vida del componente 'componentDidMount'
     * se ejecuta y en ese se aprovecha para verificar si el usuario ya se habia logeado.
     */
    componentDidMount() {
        this.isLogged();
    }

    goToHome = () => {
        this.props.history.push('/');

    }

    /**
     * Renderiza la vista
     * @returns {JSX.Element}
     */
    render() {
        return(
            (this.state.redirect)
                ? <Redirect to='/main' />
                :
                <div className={'row'}>
                    <div className="row justify-content-center w-100  mt-5">
                        <div className="row ">
                            <img src={logo} alt="Servimo SA logo" className="icon" style={{width: '10em'}}/>
                        </div>
                        <div className="row w-100 pt-3">
                            <p className="display-4 text-center w-100" style={{fontSize: '2em'}}>Bienvenido de nuevo</p>
                            <p className="display-4 text-center w-100" style={{fontSize: '2em'}}>Inicie sesión con sus credenciales</p>
                        </div>
                    </div>

                    <div className="row justify-content-center w-100">
                        <div className="col-10 col-sm-10 col-md-6 col-lg-5">
                            <form onSubmit={this.onSignIn}>
                                <InputText type="text" name="user" placeholder="Usuario"/>
                                <InputText type="password" name="pass" placeholder="Contraseña"/>
                                <SubmitButton text="Iniciar sesión"/>
                            </form>
                        </div>
                    </div>

                    <div className="row justify-content-center w-100">
                        <div className="col-10 col-ms-10 col-md-5 col-lg-4 text-center">
                            <a href="#" className="link pr-3 right-border w-50">Recuperar credenciales</a>
                            <span>|</span>
                            <a href="#" className="link pl-3">Registrarse</a>
                        </div>
                    </div>

                    {/*<div className="row justify-content-center w-100">*/}
                    {/*    <div className="col-10 col-sm-10 col-md-5 col-lg-5">*/}

                    {/*        <a href="/"><SubmitButton text="Volver al inicio" /></a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                        <DialogModal header={this.state.modalProps.modalHeader}
                                     textBody={this.state.modalProps.modalMessage}
                                     hasYesNotButtons={false}
                                     modalType={this.state.modalProps.modalType}
                                     visible={this.state.modalProps.visible}
                                     onHide={this.onHide}/>
                </div>
        );
    }

}