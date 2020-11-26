import React from 'react';
import NavItem from "./navItem/NavItem";
export default class Nav extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">Servicio de seguridad</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavItem href="/" text="Home" />
                        <NavItem href="../contact/" text="Contacto"/>
                        {/*<li className="nav-item active"><a href="/" className="nav-link">Home</a></li>*/}
                        {/*<li className="nav-item"><a href="./about.html" className="nav-link">Nosotros</a></li>*/}
                        {/*<li className="nav-item"><a href="./servicio.html" className="nav-link">Servicios</a></li>*/}
                        {/*<li className="nav-item"><a href="/contact" className="nav-link">Contacto</a></li>*/}
                    </ul>
                </div>
            </nav>
        );
    }
}