import logo from './logo.svg';
import './App.css';
import Home from './components/views/home/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from "react";
import Contact from './components/views/contact/Contac';
import ClienteNatural from "./components/views/clientes/natural/ClienteNatural";
import ClienteJuridico from "./components/views/clientes/juridico/ClienteJuridico";
import Main from "./components/views/main/Main";
import ContratoClientesJuridico from "./components/views/contrato/juridico/ContratoClientesJuridico";
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/contact">
                    {/*llamada a la clase contact*/}
                    <Contact/>
                </Route>
                <Route exact path="/main">
                    {/*llamada a la clase main*/}
                    <Main/>
                </Route>
                <Route exact path="/main/clientes/natural">
                    {/*llamada a la clase cliente natural*/}
                    <ClienteNatural/>
                </Route>
                <Route exact path="/main/clientes/Juridico">
                    {/*llamada a la clase cliente juridico*/}
                    <ClienteJuridico/>
                </Route>
                <Route exact path="/contrato/clientes/juridico">
                    {/*llamada a la clase contratoclientesjuridico clientes juridico*/}
                    <ContratoClientesJuridico/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default App;
