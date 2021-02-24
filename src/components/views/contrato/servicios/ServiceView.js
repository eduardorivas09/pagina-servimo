import { data } from 'jquery';
import { Dialog } from 'primereact/dialog';
import React, { Fragment } from 'react';
import { InputText } from "primereact/inputtext";
import GenericModal from '../../modal/GenericModal';
import { ListBox } from 'primereact/listbox';
import PropTypes from 'prop-types'
import { ServicioService } from "../../../../services/contratos/ServicioService"
import { GenericView } from '../../GenericView';
import { Toast } from "primereact/toast";
import { Calendar } from 'primereact/calendar';
export default class ServiceView extends GenericView {

    constructor() {
        super();
        this.state = {
            visible: true,
            id: -1,
            codigoContrato: '',
            fechaContrato: null,
            fechaFin: null,
            fechaInicio: null,
            diaPago: '',
            estado: '',
            data: [],
            servuciosSelecionados: [],

        }

    }

    /**
     * Metodo que valida la seleccion actual.
     * @returns {boolean} que es true si la seleccion es valida, de lo contrario false.
     */
    validSelection = () => {
        console.log(this.state.servuciosSelecionados );
        if (this.state.servuciosSelecionados == null || this.state.servuciosSelecionados.length === 0){
            this.mostrarMensajeAdvertencia("No se ha seleccionado ningun servicio")
            return false;
        }

        if (this.state.fechaInicio == null){
            this.mostrarMensajeAdvertencia("No se ha seleccionado la fecha de inicio")
            return false;
        }

        // if (this.state.fechaContrato == null){
        //     this.mostrarMensajeAdvertencia("No se ha seleccionado la de creacion del contrato")
        //     return false;
        // }

        if (this.state.fechaFin == null){
            this.mostrarMensajeAdvertencia("No se ha seleccionado la fecha fin")
            return false;
        }

        const contrato = this.getServicio();
        this.props.setContrato(contrato);

        return true;
    }

    setServicio = (servicio) => {
        console.log(servicio);
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
            servicios: this.state.servuciosSelecionados,
            'fechaContrato': this.state.fechaContrato,
            'fechaFin': this.state.fechaFin,
            'fechaInicio': this.state.fechaInicio
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
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
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
                <div className="row mt-5">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4>Fecha Inicio</h4>
                        <Calendar id="itfechaInicio"
                            onChange={(e) => this.setState({ fechaInicio: e.value })}
                            showIcon
                            showButtonBar
                            value={this.state.fechaInicio}
                        />
                    </div>

                    <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                        <h4>Fecha Fin</h4>
                        <Calendar id="itfechaFin"
                            onChange={(e) => this.setState({ fechaFin: e.value })}
                            showIcon
                            showButtonBar
                            value={this.state.fechaFin}
                        />
                    </div>

                    {/*<div className="col col-12 col-sm-12 col-md-12 col-lg-4">*/}
                    {/*    <h4>Fecha de Contrato</h4>*/}
                    {/*    <Calendar id="itfechaContrato"*/}
                    {/*        onChange={(e) => this.setState({ fechaContrato: e.value })}*/}
                    {/*        showIcon*/}
                    {/*        showButtonBar*/}
                    {/*        value={this.state.fechaContrato}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>

                <Toast ref={this.toast} position={this.right()} />
            </div>


        );

    }

}
