import  React from 'react';
import img1 from '../../../img/security.svg'
import img2 from '../../../img/planes.svg'
import img3 from '../../../img/gps.svg'
import img4 from '../../../img/recepcion.svg'
import img5 from '../../../img/acceso.jpg'
import img6 from '../../../img/alarma2.svg'
import "../../../css/index.css"

export default class Card extends React.Component{

    render() {
        const images = [img1,img2,img3,img4,img5,img6]
        const image = images[parseInt(this.props.details.imageIndex)]
        return (
            <div className="card card-hotel d-flex flex-column justify-content-between ml-2">
                <img src={image} className="card-img-top" alt="Barcelona" />
                <div className="card-body">
                    <div className="d-flex flex-wrap">
                        <div className="d-flex flex-column justify-content-between"><h5
                            className="card-title">{this.props.details.cardTitle}</h5>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                            <button type="button" className="btn btn-link" data-toggle="popover"
                                    data-placement="top"
                                    title={this.props.details.buttonTitle}
                                    data-content={this.props.details.buttonDataContent}>
                                <span className="oi oi-plus"></span></button>
                        </div>
                    </div>
                    <p className="card-text">{this.props.details.cardText}</p>
                </div>
                <div>
                    <button className="btn btn-primary btn-reserva"><span
                        className="oi oi-plus"></span> {this.props.details.mainButtonText}
                    </button>
                </div>
            </div>
        );
    }
}