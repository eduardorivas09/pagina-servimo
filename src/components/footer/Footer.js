import React from 'react';

export default class Footer extends React.Component{
    render() {
        return(
            <footer className="bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 d-flex flex-column">
                            <a href="http://www.facebook.com">Facebook</a>
                            <a href="http://www.twitter.com">Twitter</a>
                            <a href="http://www.instagram.com">Instagram</a>
                            <a href="http://www.google.com">Google</a>
                        </div>
                        <div className="col-sm-4 d-flex flex-column">
                            <address>
                                <h3>Oficina central</h3>
                                <p><span className="oi oi-home footer-address-icon"></span>De galeras santo domingo, 200
                                    vrs arribas.</p>
                                <p><span className="oi oi-phone footer-address-icon"></span>+505 81542410</p>
                                <p><span className="oi oi-inbox footer-address-icon"></span>contacto@guiahoteles.com</p>
                            </address>
                        </div>
                        <div className="col-sm-4 d-flex flex-column align-items-center">
                            <a href="#">Nostros</a>
                            <a href="#">Precios</a>
                            <a href="#">Terminos y condiciones</a>
                            <a href="#">Contacto</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}