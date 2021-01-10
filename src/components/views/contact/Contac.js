import React, {Fragment} from 'react';
import Nav from '../../panels/nav/Nav';
import  ContactForm from './contactCards/ContactForm'
import Footer from "../../panels/footer/Footer";
import "../../../static/css/contacto.css"


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