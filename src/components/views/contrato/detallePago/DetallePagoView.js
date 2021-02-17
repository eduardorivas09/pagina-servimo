import React, {Fragment} from 'react';
import {GenericView} from "../../GenericView";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {ClienteService} from "../../../../services/clientes/ClientesService";
import {ServerError} from "../../../../util/Error/ServerError";
import {PlazoService} from "../../../../services/contratos/PlazoService";
import {Toast} from "primereact/toast";

export default class DetallePagoView extends GenericView{
    constructor() {
        super();
        this.state = {
            diaPago: -1,
            plazosLst:[],
            plazoSeleccionado: null,
            costoServicio: 0
        }
    }

    //============================================  METODOS DE CARGA ============================================

    load = () => {
        new PlazoService().getAll().then(resp => {
            if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                this.setState({
                    plazosLst: resp.filter(t => t.plazoEstandar === this.props.plazoEstandar)
                });
            }

        }).catch(e => {
            if (e instanceof ServerError){
                this.mostrarMensajeError('Problema al obtener los clientes', e.message);
                return;
            }
            if (e instanceof Error){
                this.mostrarMensajeError('Problema al obtener los clientes', e.message);
            }
        });
    }

    /**
     * Metodo que valida la seleccion actual.
     * @returns {boolean} que es true si la seleccion es valida, de lo contrario false.
     */
    validSelection = () => {
        if (this.state.diaPago <= 0) {
            this.mostrarMensajeAdvertencia("No se ha establecido el dia de pago ");
            return false;
        }

        if (this.state.plazoSeleccionado === null || this.state.plazoSeleccionado === undefined) {
            this.mostrarMensajeAdvertencia("No se ha establecido el plazo");
            return false;
        }

        return true;
    }

    getDetalleServicio = () => {
        const detalleServicio = {
            diaPago: this.state.diaPago,
            plazoSeleccionado: this.state.plazoSeleccionado,
            costoServicio: this.state.costoServicio
        }
        return detalleServicio;
    }

    setDetalleServicio = (data) => {
        this.state = {
            diaPago: data.diaPago,
            plazoSeleccionado: data.plazoSeleccionado,
            costoServicio: data.costoServicio
        }
    }

    //============================================  EVENTOS DEL USUARIO ============================================

    componentDidMount() {
        this.load();
    }

    onPlazoChange = (e) => {
        this.setState({ plazoSeleccionado: e.target.value });
        console.log(e.target.value);

        const factor = e.target.value.factor;
        const plazoMes = e.target.value.plazoMes;

        this.setState({
            costoServicio: ((500 * (1 + factor - (plazoMes/100))) * plazoMes)
        });

    }

    render() {
        return (
            <Fragment>
                <div className="container m-0">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-6 col-lg-4">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputNumber id="inDiapago" min={1} max={31}/>
                                <label htmlFor="inDiapago"
                                       style={{ fontSize: '0.8em' }}>Dia de pago</label>
                            </span>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '1.3em' }}>
                            <Dropdown value={this.state.plazoSeleccionado} onChange={(e) => this.onPlazoChange(e)} options={this.state.plazosLst} optionLabel="descripcion" placeholder="Plazo pago" />
                        </div>
                        <div className="col col-12 col-sm-12 col-md-6 col-lg-4">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputNumber id="inCosto"
                                             value={this.state.costoServicio}
                                             mode="currency"
                                             currency="NIO"
                                             locale="es-NI" disabled={true}/>
                                <label htmlFor="inCosto"
                                       style={{ fontSize: '0.8em' }}>Costo del servicio</label>
                            </span>
                        </div>

                    </div>
                </div>
                <Toast ref={this.toast} position={this.right()}/>
            </Fragment>
        );
    }
}