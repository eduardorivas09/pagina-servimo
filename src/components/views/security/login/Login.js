import React from 'react';
import { Redirect } from 'react-router-dom'
import './login.css'
import logo from './../../../../static/img/Servimo.jpg';
import InputText from './../../../controls/field/input/text/InputText';
import SubmitButton from "../../../controls/button/submit/SubmitButton";
import {Session} from "../../../../services/seguridad/Session";

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }

        this.changeState = this.changeState.bind(this);
        this.onSignIn = this.onSignIn.bind(this);

        const storedToken = localStorage.getItem('token');
        if (storedToken !== undefined && storedToken !== null){
            this.changeState();
        }
    }

    changeState(){
        this.setState({
            redirect : true
        });
    }

   async onSignIn(e){
        e.preventDefault();
        const user = document.getElementsByName("user")[0].value;
        const pass = document.getElementsByName("pass")[0].value;
        if ((user !== null && user.length > 0) && (pass !== null && pass.length > 0)){
            const token = await new Session().initSession(user,pass);
            if (token !== null){
                localStorage.setItem('token',token);
                this.changeState();
            }
        }
    }

    render() {
        return(
            (this.state.redirect === false)
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
                </div>
        );
    }

}