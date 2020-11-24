import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from "react";
import Contact from './components/contact/Contac';
import ClienteNatural from "./components/clientes/natural/ClienteNatural";
import Main from "./components/main/Main";
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
                    {/*llamada a la clase contact*/}
                    <Main/>
                </Route>
                <Route exact path="/main/clientes/natural">
                    {/*llamada a la clase contact*/}
                    <ClienteNatural/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default App;
