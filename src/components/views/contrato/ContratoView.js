import {GenericView} from "../GenericView";
import React, {Fragment, useState} from 'react';
import Table from "../../controls/table/Table";
import {Toast} from "primereact/toast";
import {Steps} from "primereact/steps";
import {TabPanel} from "primereact/tabview";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import './Contrato.css';
import {ClienteService} from '../../../services/clientes/ClientesService'
import {RadioButton} from "primereact/radiobutton";
import {Dropdown} from "primereact/dropdown";
import ServiceView from "./ServiceView";
import SelectCliente from "./selectabledComponents/selectClientes/SelectCliente";
import DetallePagoView from "./detallePago/DetallePagoView";
import ResumenContrato from "./ResumenContrato";

/**
 * @author Josue Reyes.
 * @version 1.0
 * @since 1.0, 6/02/2021
 *
 * Clase que permite la gestion los contratos.
 *
 */
export class ContratoView extends GenericView{


    /**
     * @constructor de la clase.
     * Se inicializan las propiedades.
     */
    constructor() {
        super();
        this.addNewContract = this.addNewContract.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.nextvent = this.nextvent.bind(this);
        this.backEvent = this.backEvent.bind(this);


        this.state = {
            activeIndex : 0,
            nextButtonEnabled: false,
            backButtonEnabled: true,
            currentComponent: null,
            selectedCliente: null,

            contratoData: null
        }

        this.clienteView = React.createRef();
        this.detallePagoRef = React.createRef();
        this.contratoRef = React.createRef();

        this.index = 0;
        this.detallePagoObj = null;
        // this.selectedCliente = null;
        // this.detallePagoObj = null;

        this.setCliente = this.setCliente.bind(this);
        this.setDetallePago = this.setDetallePago.bind(this);
        this.setContrato = this.setContrato.bind(this);
    }

    setCliente = (e) => {
        this.setState({selectedCliente: e});
    }

    setDetallePago = (e) => {
        console.log(e);
        // this.setState({detallePagoObj: e});
        this.detallePagoObj = e;
    }

    setContrato = (e) => {
        console.log(e);
        this.setState({contratoData: e});
    }

    /**
     * @since 1.0
     *
     * Metodo que abre el modal para agregar/editar un contrato.
     */
    addNewContract = () => {

    }

    /**
     * @since 1.0
     *
     * Metodo que retorna las columnas que puede mostrar la tabla.
     * @returns {({field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean}|{field: string, header: string, sortable: boolean})[]}
     */
    visibledColumns = () => {
        return [
            {
                field:"userName",
                header:"Nombre de Usuario",
                sortable:true
            },{
                field:"rol.rol",
                header:"Rol",
                sortable:true
            },{
                field:"fechaCreacion",
                header:"Fecha Creacion",
                sortable:true
            },{
                field:"activo",
                header:"Estado",
                sortable:false
            },
        ]
    }

    stepsItems = () => {
        return [
            {
                label: 'Cliente',
                command: (event) => {

                }
            },
            {
                label: 'Contrato',
                command: (event) => {

                }
            },
            {
                label: 'Detalle Pago',
                command: (event) => {

                }
            },
            {
                label: 'Resumen',
                command: (event) => {

                }
            }
        ]
    }

    renderFooter = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button  label="Regresar" onClick={this.backEvent} disabled={this.state.backButtonEnabled} icon={'pi pi-angle-left'} className="p-button-rounded p-button" />
                <Button label="Siguiente" onClick={this.nextvent} disabled={this.state.nextButtonEnabled} icon={'pi pi-angle-right'} className="p-button-rounded p-button" />
            </div>
        );
    }


    infoCliente = () => {

        if (this.state.clienteView != null) {
            this.clienteView.current.setCliente(this.state.selectedCliente);
        }

        return (
            <SelectCliente ref={this.clienteView}  setCliente={this.setCliente}/>

        );
    }

    infoServicios = () => {

        return (
            <ServiceView ref={this.contratoRef} setContrato={this.setContrato}/>
        );
    }

    infoDetallePago = () => {

        const plazoEstandar = this.state.selectedCliente.tipoCliente === "Cliente Natural";

        return (
            <div>
                <DetallePagoView ref={this.detallePagoRef} plazoEstandar={plazoEstandar} setDetallePago={this.setDetallePago}/>
            </div>
        );
    }

    infoResumen = () => {
        console.log(this.state.detallePagoObj)
        return (
            <div>
                <ResumenContrato cliente={this.state.selectedCliente}
                                 servicio={this.state.contratoData}
                                 pago={this.detallePagoObj}/>
            </div>
        );
    }

    renderContent = () => {
        return (
            <Panel className={'mt-5 mb-2'} style={{border: 'none'}} >
                {this.state.currentComponent}
            </Panel>
        );
    }

    backEvent = () => {
        this.index -= 1;
        this.setBackViewData(this.index);
        this.changeIndex(this.index);
    }

    nextvent = () => {
        // console.log(this.state)
        //  VERIFICA SI LA VISTA ACTUAL CONTIENE TODAS LOS DATOS REQUERIDOS
        if (!this.testValidations(this.index)){
            return;
        }
        this.index += 1;
        this.changeIndex(this.index)
    }

    changeIndex = (index) => {
        // console.log(this.state)
        this.setState({
            activeIndex: (index)
        });

        this.setComponent(index)

        this.setState({
            nextButtonEnabled: (index === 3),
            backButtonEnabled: (index === 0)
        });
    }

    setBackViewData = (index) => {
        // console.log(this.state.contratoData)
        // if(index === 0) this.selectedCliente.current.setCliente(this.state.selectedCliente);
        // if(index === 1) this.contratoRef.current.setServicio(this.state.contratoData);
        // if(index === 2) this.detallePagoRef.current.setServicio(this.state.detallePagoObj);
    }

    testValidations = (index) => {
        //this.setState({selectedCliente: this.clienteView.current.getCliente()});
        if (index === 0 && (this.state.selectedCliente == null && !this.clienteView.current.validSelection())) return false;
        if (index === 1 && (this.state.contratoData == null && !this.contratoRef.current.validSelection())) return false;
        if (index === 2 && (this.detallePagoObj == null && !this.detallePagoRef.current.validSelection())) return false;

        // if (index === 2 && (this.state.selectedCliente == null && !this.clienteView.current.validSelection())) return false;
        // if (index === 3 && (this.state.selectedCliente == null && !this.clienteView.current.validSelection())) return false;



        // if (index === 1 && (this.state.contratoData == null && !this.contratoRef.current.validSelection())) {
        //     return false;
        // } else if(index === 1) {
        //     let contrato = (this.contratoRef.current.getServicio() != null || this.state.contratoData === null
        //         ? this.contratoRef.current.getServicio()
        //         : this.state.contratoData);
        //     console.log(contrato)
        //     contrato = contrato.data;
        //     this.setState({contratoData: contrato});
        // }
        //
        // if (index === 2 && (this.state.detallePagoObj == null && !this.detallePagoRef.current.validSelection())) {
        //     return false;
        // } else if(index === 2) {
        //     let detalle = (this.state.detallePagoObj == null || this.state.detallePagoObj === undefined
        //         ? this.detallePagoRef.current.getDetalleServicio()
        //         : this.state.detallePagoObj);
        //
        //     detalle = detalle.data;
        //     this.setState({detallePagoObj: detalle});
        // }

        return true;
    }

    setComponent = (index) => {
        let compo = null;

        if (index === 0)
            // compo = this.infoDetallePago();
            compo = this.infoCliente();
            // compo = this.infoServicios();
        if (index === 1)
            compo = this.infoServicios();
            // compo = this.infoCliente();
        if (index === 2)
            // compo = this.infoCliente();
            compo = this.infoDetallePago();
        if (index === 3)
            compo = this.infoResumen();

        this.setState({
            currentComponent: compo
        });
    }

    componentDidMount() {
        this.setComponent(0);
    }

    render(){
        return (
            <Fragment>
                <div className="steps-component" >
                    {/*TABLA DE CONTENIDO*/}
                    {/*<Table*/}
                    {/*        columns={this.visibledColumns()}*/}
                    {/*       onClickAdd={this.addNewContract}*/}
                    {/*       onRowDoubleClick={this.onRowDoubleClick}*/}
                    {/*       entity="Contrato"/>*/}

                    {/*STEPS COMPOENTENS*/}
                    {/*<div className="row">*/}
                        <Steps
                            model={this.stepsItems()}
                            activeIndex={this.state.activeIndex}  />
                    {/*</div>*/}

                    {/*CONTENIDO*/}
                    {this.renderContent()}

                    {/*FOOTER*/}
                    <div className="container steps-footer" >
                        {this.renderFooter()}
                    </div>

                    {/*   COMPONENTE PARA VISUALIZAR LOS MENSAJES EN PANTALLA    */}
                    <Toast ref={this.toast} position={this.right()}/>
                </div>
            </Fragment>
        );
    }
}