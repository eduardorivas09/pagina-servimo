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
        this.selectCliente = this.selectCliente.bind(this);


        this.state = {
            activeIndex : 0,
            nextButtonEnabled: false,
            backButtonEnabled: true,
            currentComponent: null,
            selectedCliente : null
        }

        this.clienteView = React.createRef();

        this.index = 0;
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
                label: 'Servicios',
                command: (event) => {

                }
            },
            {
                label: 'Cliente',
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

    selectCliente = (e) => {
        if (e !== null ) {

        }
    }



    infoCliente = () => {

        return (
            <SelectCliente ref={this.clienteView}/>

        );
    }

    infoServicios = () => {
        return (
            <ServiceView />
        );
    }

    infoDetallePago = () => {
        return (
            <div>
                <DetallePagoView/>
            </div>
        );
    }

    infoResumen = () => {
        return (
            <div>
                <h3>TEXT 4</h3>
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
        this.changeIndex(this.index);
    }

    nextvent = () => {
        //  VERIFICA SI LA VISTA ACTUAL CONTIENE TODAS LOS DATOS REQUERIDOS
        if (!this.testValidations(this.index)){
            return;
        }
        this.index += 1;
        this.changeIndex(this.index)
    }

    changeIndex = (index) => {

        this.setState({
            activeIndex: (index)
        });

        this.setComponent(index)

        this.setState({
            nextButtonEnabled: (index === 3),
            backButtonEnabled: (index === 0)
        });
    }

    testValidations = (index) => {
        //this.setState({selectedCliente: this.clienteView.current.getCliente()});
        if (index === 1 && (this.state.selectedCliente == null && !this.clienteView.current.validSelection())) {
            return false;
        }else if(index === 1) {
            this.setState({
                selectedCliente: (this.state.selectedCliente == null
                    ? this.clienteView.current.validSelection()
                    : this.state.selectedCliente)
            });
        }

        return true;
    }

    setComponent = (index) => {
        let compo = null;

        if (index === 0)
            // compo = this.infoDetallePago();
            // compo = this.infoCliente();
            compo = this.infoServicios();
        if (index === 1)
            // compo = this.infoServicios();
            compo = this.infoCliente();
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