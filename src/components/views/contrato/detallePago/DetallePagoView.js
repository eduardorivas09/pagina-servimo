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
            plazoSeleccionado: null
        }
    }

    //============================================  METODOS DE CARGA ============================================

    load = () => {
        new PlazoService().getAll().then(resp => {
            if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                this.setState({
                    plazosLst: resp

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

    //============================================  EVENTOS DEL USUARIO ============================================

    componentDidMount() {
        this.load();
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
                            <Dropdown value={this.state.plazoSeleccionado} onChange={(e) => this.setState({ plazoSeleccionado: e.target.value })} options={this.state.plazosLst} optionLabel="descripcion" placeholder="Plazo pago" />
                        </div>


                    </div>
                </div>
                <Toast ref={this.toast} position={this.right()}/>
            </Fragment>
        );
    }
}