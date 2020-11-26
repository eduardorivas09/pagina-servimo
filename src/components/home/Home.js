import React, {Fragment} from 'react'

import Nav from '../nav/Nav';
import Card from "./homeCards/Card";

import homeImage from '../../img/10077.jpg';
import dataJson from './home_data.json'


// import 'jquery'
// import 'popper.js'
import Footer from "../footer/Footer";


export default class Home extends React.Component{

    render() {
        return(

            <Fragment>
                <Nav/>

                <div className="container-sm">
                    <div className="col-md-6 col-imagen">
                        <img src={homeImage} className="img-fluid img-principal" alt="Responsive image" />
                    </div>

                    <div className="d-flex flex-wrap">
                        {
                            // console.log(dataJson)
                            Object.keys(dataJson).map(key => (
                                <Card details={dataJson[key]}/>
                            ))
                        }

                    </div>

                </div>

                <Footer/>
            </Fragment>
        );
    }

    loadData() {

    }

}