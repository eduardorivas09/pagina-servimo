import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from "react";
import Contact from './components/contact/Contac';
import ClienteNatural from "./components/clientes/natural/ClienteNatural";

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
                <Route exact path="/clientes/natural">
                    {/*llamada a la clase contact*/}
                    <ClienteNatural/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
