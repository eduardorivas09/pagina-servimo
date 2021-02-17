import { data } from 'jquery';
import { Dialog } from 'primereact/dialog';
import React, { Fragment } from 'react';
import { InputText } from "primereact/inputtext";
import GenericModal from '../modal/GenericModal';
import { ListBox } from 'primereact/listbox';
import PropTypes from 'prop-types'
import { ServicioService } from "../../../services/contratos/ServicioService"
import { GenericView } from '../GenericView';
import { Toast } from "primereact/toast";
import { Calendar } from 'primereact/calendar';
export default class ServiceView extends GenericView {

    constructor() {
        super();
        this.state = {
            visible: true,
            id: -1,
            codigoContrato: '',
            fechaContrato: '',
            fechaExpira: '',
            fechaInicio: '',
            diaPago: '',
            estado: '',
            data: [],
            servuciosSelecionados: [],

        }

    }

    setServicio = (servicio) => {
        if (servicio === undefined || servicio === null) {
            this.setState({
                id: null,
                codigoContrato: null,
                fechaContrato: null,
                fechaExpira: null,
                fechaInicio: null,
                diaPago: null,
                estado: true,


            });

        } else {
            this.setState({
                id: servicio.data.id,
                codigoContrato: servicio.data.codigoContrato,
                fechaContrato: servicio.data.fechaContrato,
                fechaFin: servicio.data.fechaExpira,
                fechaIncio: servicio.data.fechaInicio,
                diaPago: servicio.data.diaPago,
                estado: servicio.data.estado

            });
        }
    }

    getServicio = () => {
        const servisio = {
            'id': this.state.id,
            'codigoContrato': this.state.codigoContrato,
            'fechaContrato': this.state.fechaContrato,
            'fechaExpira': this.state.fechaExpira,
            'fechaInicio': this.state.fechaInicio,
            'diaPago': this.state.diaPago,
            'estado': this.state.estado

        }
        if (this.state.id !== undefined && this.state.id > 0) {
            servisio.id = this.state.id;
        }
        return servisio;

    }

    load = () => {
        new ServicioService()
            .getAll()
            .then(resp => {
                console.log(resp)
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array) {
                    this.setState({
                        data: resp
                    })
                }
            }).catch(e => {
                if (e instanceof Error) {
                    this.mostrarMensajeError('Acceso denegado', e.message);
                }
            });
    }

    componentDidMount() {
        this.load();
    }

    render = () => {
        return (

            <div className="container m-0">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4> Selecione el servicio</h4>
                        <ListBox id="itCodigoContrato"
                            multiple={true}
                            onChange={(e) => this.setState({ servuciosSelecionados: e.value })}
                            value={this.state.servuciosSelecionados}
                            options={this.state.data}
                            optionLabel={'tipoSevicio'}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4>Fceha Inicio</h4>
                        <Calendar id="itfechaInicio"
                            onChange={(e) => this.setState({ fechaInicio: e.value })}
                            showIcon
                            showButtonBar
                            value={this.state.fechaInicio}
                        />
                    </div>


                </div>

                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4>Fceha Fin</h4>
                        <Calendar id="itfechaFin"
                            onChange={(e) => this.setState({ fechaFin: e.value })}
                            showIcon
                            showButtonBar
                            value={this.state.fechaFin}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4>Fecha de Contrato</h4>
                        <Calendar id="itfechaContrato"
                            onChange={(e) => this.setState({ fechaContrato: e.value })}
                            showIcon
                            showButtonBar
                            value={this.state.fechaContrato}
                        />
                    </div>
                </div>

                <Toast ref={this.toast} position={this.right()} />
            </div>


        );

    }

}
