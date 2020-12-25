import React from 'react';
import './login.css'
import logo from './../../../../static/img/Servimo.jpg';
import InputText from './../../../controls/field/input/text/InputText';
import SubmitButton from "../../../controls/button/submit/SubmitButton";

export default class Login extends React.Component{
    render() {
        return(
            <div id="login">
                <div className="container top-container">
                    <img src={logo} alt="Servimo SA logo" className="icon"/>
                    <h1>Bienvenido de nuevo</h1>
                    <h3>Inicie sesión con sus credenciales</h3>
                </div>

                <div className="container center-container">
                    <form>
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
                    <a href="/" className="btn btn-primary">Inicio</a>
                </div>
            </div>
        );
    }

}