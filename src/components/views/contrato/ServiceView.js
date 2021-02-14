import { data } from 'jquery';
import { Dialog } from 'primereact/dialog';
import React, { Fragment } from 'react';
import { InputText } from "primereact/inputtext";
import GenericModal from '../modal/GenericModal';
import { ListBox } from 'primereact/listbox';
import PropTypes from 'prop-types'
import { ServicioService } from "../../../services/contratos/ServicioService"
export default class ServiceView extends GenericModal {

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


    componentDidMount() {
        new ServicioService()

            .getAll()
            .then(resp => {
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

        toRender = () => {
            return (


                <div className="container m-0">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">

                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <ListBox id="itCodigoContrato"
                                    value={this.state.servuciosSelecionados}
                                    options={this.state.data}
                                />
                                <label htmlhtmlFor="itCodigoContrato" style={{ fontSize: '0.8em' }}>Codigo del Trabajador </label>
                            </span>
                        </div>
                    </div>
                </div>





            );

        }

    }
}