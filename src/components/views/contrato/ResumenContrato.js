import React, {Fragment} from 'react';
import {GenericView} from "../GenericView";
import {InputText} from "primereact/inputtext";
import {ListBox} from "primereact/listbox";

export default class ResumenContrato extends GenericView{

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12 mt-3"><p className='display-4'>Sobre el Cliente</p></div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="nombre">Nombre del cliente</label>
                        <InputText id={'nombre'} style={{'height' : '50%'}}  value={this.props.cliente.nombre} disabled/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="tipoCliente">Tipo Cliente</label>
                        <InputText id={'tipoCliente'} style={{'height' : '50%'}} value={this.props.cliente.tipoCliente} disabled/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-3"><p className='display-4'>Sobre el Servicio</p></div>
                    <div className="col-12  mb-3">
                        <ListBox id="itCodigoContrato"
                                 options={this.props.servicio.servicios}
                                 optionLabel={'tipoSevicio'}
                                 disabled/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="fechaInicio">Inicia contrato</label>
                        <InputText id={'fechaInicio'} style={{'height' : '50%'}} value={this.props.servicio.fechaInicio.toISOString().split('T')[0]} disabled/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="fechaFin">Culmina contrato</label>
                        <InputText id={'fechaFin'} style={{'height' : '50%'}} value={this.props.servicio.fechaFin.toISOString().split('T')[0]} disabled/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-3"><p className='display-4'>Sobre el pago</p></div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <label htmlFor="diaPago">Dia de pago</label>
                        <InputText id={'diaPago'} style={{'height' : '50%'}} value={this.props.pago.diaPago} disabled/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <label htmlFor="plazo">Plazo</label>
                        <InputText id={'plazo'} style={{'height' : '50%'}} value={this.props.pago.plazoSeleccionado.descripcion} disabled/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <label htmlFor="costo">Costo</label>
                        <InputText id={'costo'} style={{'height' : '50%'}} value={this.props.pago.costoServicio} disabled/>
                    </div>
                </div>


            </Fragment>
        )
    }

}