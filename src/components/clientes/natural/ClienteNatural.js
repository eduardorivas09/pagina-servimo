import React, {Fragment} from 'react';
import $ from 'jquery';
import SearchField from "../../commun/field/SearchField";
import Table from "../../commun/table/Table";
import ClienteNaturalModal from "./ClienteNaturalModal";
import setting from '../../../ApiSetting.json';
import BreadCrumb from "../../nav/breadcrumb/BreadCrumb";
import 'bootstrap';

export default class ClienteNatural extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data: [],
            selectedObject: []
        }

        this.buscar = this.buscar.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.rowClicked = this.rowClicked.bind(this);
    }

    buscar(e) {
        e.preventDefault();
        if (this.state.busqueda.trim().length > 0) {
            this.loadData(this.state.busqueda);
        }
        if (this.state.busqueda.trim().length == 0)
            this.loadData();

    }

    onSearchChange(e) {

        this.setState(
            {
                busqueda: e.target.value
            }
        )

        if (this.state.busqueda.trim().length == 0)
            this.loadData()
    }

    rowClicked(e) {
        let rowId = e.target.parentNode.firstChild.textContent;
        let url = setting.url + `clientes/natural/${rowId}`
        let arr = []
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': ''
                }
            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())
            .then(resp => {
                arr.push(resp);
            })

        this.setState({
            selectedObject: arr
        });

        $('#exampleModal').modal('show');

    }

    componentDidMount() {
        this.loadData();
    }

    loadData(search) {

        let url = setting.url + "clientes/natural"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""

        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': ''
                }
            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    data: resp
                })
            })
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
                                data-target="#exampleModal">Agregar
                        </button>

                        {/*Modal*/}
                        <ClienteNaturalModal object={this.state.selectedObject}/>
                        {/*Tabla*/}
                        <Table onClick={this.rowClicked} data={temp}/>
                    </div>
                </div>
            </div>

        );
    }
}