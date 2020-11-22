import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import React from "react";
import Contact from './components/contact/Contac';

function App() {
  return (
      // <Home/>
      <BrowserRouter>
      <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
          <Route exact path="/contact">
            {/*llamada a la clase contact*/}
            <Contact/>
            {/*<Home/>*/}
          </Route>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
