import React, {Fragment} from 'react';
import Nav from '../nav/Nav';
import  ContactForm from './contactCards/ContactForm'
import Footer from "../footer/Footer";
import "../../css/contacto.css"


export default class Contac extends React.Component{
    render() {
        return(

            <Fragment>
                <Nav/>

                <div className="container">


                        <ContactForm/>



                </div>

                <Footer/>
            </Fragment>
        );
    }
}