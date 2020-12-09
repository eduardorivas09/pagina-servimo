import React from 'react';
import NavItem from "./navItem/NavItem";
export default class Nav extends React.Component{

    render() {
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">Servicio de seguridad</a>
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                {/*        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavItem href="/" text="Home" />
                        <NavItem href="../contact/" text="Contacto"/>

                    </ul>

                    <a href="#" className="btn bg-white px-3 py-2" >Iniciar Session</a>
                </div>
            </nav>
        );
    }
}