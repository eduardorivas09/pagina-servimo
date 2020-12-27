import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './login.css'
import logo from './../../../../static/img/Servimo.jpg';
import InputText from './../../../controls/field/input/text/InputText';
import SubmitButton from "../../../controls/button/submit/SubmitButton";
import {Session} from "../../../../services/seguridad/Session";
import $ from 'jquery';
import Modal from "../../../controls/modal/Modal";
import AbstractModal from "../../../controls/modal/AbstractModal";

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }

        this.changeState = this.changeState.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.failLogin = this.failLogin.bind(this);
    }

    failLogin(){
        $('#modal').modal('show')
    }

    changeState(){
        this.setState({
            redirect : true
        });
        console.log("Cambiando el state en react. Estate Cambiado a " + this.state.redirect)
    }

   async onSignIn(e){
        e.preventDefault();
        const user = document.getElementsByName("user")[0].value;
        const pass = document.getElementsByName("pass")[0].value;
        if ((user !== null && user.length > 0) && (pass !== null && pass.length > 0)){
            const token = await new Session().initSession(user,pass, this.failLogin);
            console.log(`Valor del token es ${token}`)
            if (token !== null){
                localStorage.setItem('token',token);
                Session.token = token;
                this.changeState();
            }
        }
    }

    componentDidMount() {
        console.log("Component didmount!")
        const storedToken = localStorage.getItem('token');
        console.log(`Token almancenado como cookie es ${storedToken}`);
        if (storedToken !== undefined && storedToken !== null){
            Session.token = storedToken;
            this.changeState();
        }
    }

    render() {
        console.log(`Condicion this.state.redirect ${this.state.redirect}`)
        if (this.state.redirect){
            $('#modal').modal('hide')
        }
        return(
            (this.state.redirect)
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

                    <Modal id="modal"/>
                </div>
        );
    }

}