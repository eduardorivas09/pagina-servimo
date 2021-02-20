import React, {Fragment} from 'react';
import Table from "../../../controls/table/Table";
import {ContratoService} from "../../../../services/contratos/ContratoService";
import {Utils} from "../../../../util/Utils";
import {GenericView} from "../../GenericView";
import {Toast} from "primereact/toast";

export default class ContratoTable extends GenericView{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    /*
    ====================================================================================================================
                                              EVENTOS PARA MANEJO DE LOS DATOS
     */
    visibledColumns = () => {
        return [
            {
                field:"codigoContrato",
                header:"Codigo contrato",
                sortable:true
            },{
                field:"clienteNombre",
                header:"Cliente",
                sortable:true
            },{
                field:"plazo",
                header:"Plazo",
                sortable:true
            },{
                field:"fechaInicio",
                header:"Fecha inicio",
                sortable:true
            },{
                field:"fechaExpira",
                header:"Fecha Expira",
                sortable:true
            },{
                field:"diaPago",
                header:"Dia pago",
                sortable:true
            },{
                field:"estado",
                header:"Estado",
                sortable:true
            }
        ]
    }

    /*
    ====================================================================================================================
                                          EVENTOS DEL USUARIO Y DEL CICLO DE VIDA DEL COMPONENTE
     */

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        new ContratoService()
            .getAll()
            .then(resp => {
                // const values = resp.map(c => {
                //     c.fechaContrato = new Date(c.fechaContrato).toISOString();
                //     return c;
                // });

                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                    this.setState({
                        data: resp.map(c => {
                            c.fechaInicio = Utils.ConvertTimestampToIsoStringDate(c.fechaInicio)
                            c.fechaExpira = Utils.ConvertTimestampToIsoStringDate(c.fechaExpira);
                            return c;
                        })
                    })
                }

            }).catch(e => {

            if (e instanceof Error){
                this.mostrarMensajeError('Acceso denegado', e.message);
            }
        });
    }

    render() {
        return (
            <Fragment>
            <Table promise={this.state.data}
                   columns={this.visibledColumns()}
                   onClickAdd={this.props.addContrato}
                   onRowDoubleClick={this.props.onRowDoubleClick}
                   entity="Contrato"/>
                <Toast ref={this.toast} position={this.right()}/>
            </Fragment>

        );
    }

}