import React from 'react';
import $ from 'jquery';
import SearchField from "../../../controls/field/input/search/SearchField";
import Table from "../../../controls/table/Table";
import ClienteNaturalModal from "./ClienteNaturalModal";
import BreadCrumb from "../../../panels/nav/breadcrumb/BreadCrumb";
import 'bootstrap';
import {ClienteNaturalService} from "../../../../services/clientes/ClienteNaturalService";
import DialogModal from "../../alerts/DialogModal";

export default class ClienteNatural extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data: [],
            rowId: -1,
            modalProps : {
                modalHeader : null,
                modalMessage : null,
                modalType : 'info',
                visible : false
            }
        }

        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.rowClicked = this.rowClicked.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
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

    rowClicked(e) {
        let rowId = e.target.parentNode.firstChild.textContent;

        this.setState({
            rowId : rowId
        })

        this.getModal();
        $('#exampleModal').modal('show');

    }

    componentDidMount() {
        this.loadData();
    }

    loadData(search) {

        new ClienteNaturalService()
            .getFiltered(search)
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
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

    getModal(){
        this.refs.child.findById(this.state.rowId);
    }

    onButtonClick(){
        this.setState({
            rowId : -1
        })

        this.getModal();
        $('#exampleModal').modal('show');
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
            delete c.direccion;
            delete c.edad;
            delete c.segundoApellido;
            delete c.segundoNombre;
            delete c.estadoCivil;
            return c;
        });

        const tree = [
            {
                id: 1,
                text: "Home",
                href: "/",
                isActive: true
            }
            ,
            {
                id: 2,
                text: "Clientes",
                href: "/",
                isActive: false
            },
            {
                id: 3,
                text: "Natural",
                href: "/clientes/natural",
                isActive: false
            }

        ]
        return (
            <div className="row mb-5">

                <div className="col-lg-12 mx-auto">

                    <div className="bg-white p-5 rounded">
                        {/*Banda de navegacion*/}
                        <BreadCrumb tree={tree}/>
                        {/*titulo*/}
                        <h1 className="display-4">Cliente natural</h1>
                        {/*Campo de busqueda*/}
                        <SearchField onSearchChange={this.onSearchChange} placeholder="Qué cliente buscará?"
                                     onSubmit={this.buscar}/>

                        {/*Boton que activa el modal*/}
                        <button type="button" className="btn btn-primary mb-2 mr-auto" data-toggle="modal"
                                data-target="#exampleModal" onClick={this.onButtonClick}>Agregar
                        </button>

                        {/*Modal*/}
                        <ClienteNaturalModal ref="child" selectedId={this.state.rowId}/>

                        {/*Tabla*/}
                        <Table onClick={this.rowClicked} data={temp}/>
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