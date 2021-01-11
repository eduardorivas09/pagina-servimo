import React from 'react';
import SearchField from "../../../controls/field/input/search/SearchField";
import Table from "../../../controls/table/Table";
import 'bootstrap';
import {ContratoClienteJuridicoService} from "../../../../services/contratos/ContratoClienteJuridicoService";
import DialogModal from "../../alerts/DialogModal";


export default class ContratoClientesJuridico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data : [],
            modalProps : {
                modalHeader : null,
                modalMessage : null,
                modalType : 'info',
                visible : false
            }
        }
        this.buscar = this.buscar.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    buscar(e) {
        e.preventDefault();
        if (this.state.busqueda.trim().length > 0) {
            this.loadData(this.state.busqueda);
        }
        if (this.state.busqueda.trim().length === 0)
            this.loadData();

    }

    onSearchChange(e) {

        this.setState(
            {
                busqueda: e.target.value
            }
        )

        if (this.state.busqueda.trim().length === 0)
            this.loadData()
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(search){

        new ContratoClienteJuridicoService()
            .getFiltered(search)
            .then(resp => {
                if (resp instanceof Response && resp.status === 200){
                    this.setState({
                        data: resp
                    })
                }

            }).catch(e => {

            if (e instanceof Error){

                this.setState({
                    modalProps : {
                        modalHeader : 'Acceso denegado',
                        modalMessage : e.message,
                        modalType : 'warning',
                        visible : true
                    }});
            }
        });
    }

    /**
     * El metodo show abre el modal.
     */
    onHide = () => {
        this.setState({
            modalProps : {
                visible : false
            }
        });
    }

    render() {
        const temp = this.state.data.map(o => {
            let c = Object.assign({}, o);
            delete c.codigoContrato;
            delete c.fechaContrato;
            delete c.fechaInicio;
            delete c.fechaExpira;
            delete c.diaPago;
            delete c.estado;
            delete c.noRuc;



            return c;
        });

        // const tree = [
        //     {
        //         id: 1,
        //         text: "Home",
        //         href: "/",
        //         isActive: false
        //     }
        //     ,
        //     {
        //         id: 2,
        //         text: "Clientes",
        //         href: "/",
        //         isActive: false
        //     },
        //     {
        //         id: 3,
        //         text: "juridico",
        //         href: "/",
        //         isActive: true
        //     }
        // ]
        return (
            <div className="row mb-5">

                <div className="col-lg-12 mx-auto">

                    <div className="bg-white p-5 rounded">
                        {/*Banda de navegacion*/}
                        {/*<BreadCrumb tree={tree}/>*/}
                        {/*titulo*/}
                        <h1 className="display-4">Contrato Clientes Juridico</h1>
                        {/*Campo de busqueda*/}
                        <SearchField onSearchChange={this.onSearchChange} placeholder="Qué cliente buscará?"
                                     onSubmit={this.buscar}/>
                        {/*Tabla*/}
                        <Table data={temp}/>
                    </div>
                </div>

                <DialogModal header={this.state.modalProps.modalHeader}
                             textBody={this.state.modalProps.modalMessage}
                             hasYesNotButtons={false}
                             modalType={this.state.modalProps.modalType}
                             visible={this.state.modalProps.visible}
                             onHide={this.onHide}/>
            </div>

        );
    }
}