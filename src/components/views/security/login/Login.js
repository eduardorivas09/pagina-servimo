import React from 'react';
import { Redirect } from 'react-router-dom'
import './login.css'
import logo from './../../../../static/img/Servimo.jpg';
import InputText from './../../../controls/field/input/text/InputText';
import SubmitButton from "../../../controls/button/submit/SubmitButton";
import {Session} from "../../../../services/seguridad/Session";
import DialogModal from "../../alerts/DialogModal";

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            modalProps : {
                modalHeader : null,
                modalMessage : null,
                modalType : 'info',
                visible : false
            }
        }

        this.changeState = this.changeState.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {
        const storedToken = localStorage.getItem('token');
        console.log("Token almacenado " + storedToken);
        if (storedToken !== undefined && storedToken !== null){
            this.changeState();
        }

    }

    changeState(){
        console.log("Change state!!")
        this.setState({
            redirect : true
        });
    }

   async onSignIn(e){
        e.preventDefault();
        const user = document.getElementsByName("user")[0].value;
        const pass = document.getElementsByName("pass")[0].value;
        if ((user !== null && user.length > 0) && (pass !== null && pass.length > 0)){
            let token = null;

            try {
                token = await new Session().initSession(user,pass);
            }catch (e) {
                this.setState({
                    modalProps : {
                        modalHeader : 'Error al iniciar sesion',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            }

            if (token !== null){
                localStorage.setItem('token',token);
                this.changeState();
            }
        }
    }

    /**
     * El metodo show abre el modal.
     */
    onHide = () => {
        this.setState({
            modalProps : {
                visible : false
            }
        });
    }

    render() {
        return(
            (this.state.redirect === true)
                ? <Redirect to='/main' />
                :
                <div id="login">
                    <div className="container top-container">
                        <img src={logo} alt="Servimo SA logo" className="icon"/>
                        <h1>Bienvenido de nuevo</h1>
                        <h3>Inicie sesión con sus credenciales</h3>
                    </div>

                    <div className="container center-container">
                        <form onSubmit={this.onSignIn}>
                            <InputText type="text" name="user" placeholder="Usuario"/>
                            <InputText type="password" name="pass" placeholder="Contraseña"/>
                            <SubmitButton text="Iniciar sesión"/>
                        </form>
                    </div>

                    <div className="container button-container">
                        <a href="#" className="link right-border">Recuperar credenciales</a>
                        <span>|</span>
                        <a href="#" className="link">Registrarse</a>
                    </div>

                    <div className="container center-container">
                        <a href="/" className="btn btn-primary"><i className="pi pi-check p-mr-2">Inicio</i></a>
                    </div>

                    {

                        <DialogModal header={this.state.modalProps.modalHeader}
                                     textBody={this.state.modalProps.modalMessage}
                                     hasYesNotButtons={false}
                                     modalType={this.state.modalProps.modalType}
                                     visible={this.state.modalProps.visible}
                                     onHide={this.onHide}/>
                    }
                </div>
        );
    }

}