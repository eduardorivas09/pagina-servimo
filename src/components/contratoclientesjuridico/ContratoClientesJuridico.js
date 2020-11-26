import React from 'react';
import SearchField from "../commun/field/SearchField";
import Table from "../commun/table/Table";
import setting from '../../ApiSetting.json';
import 'bootstrap';
import BreadCrumb from "../nav/breadcrumb/BreadCrumb";


export default class ContratoClientesJuridico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            data : []
        }
        this.buscar = this.buscar.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
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

    componentDidMount() {
        this.loadData();
    }

    loadData(search){

        let url = setting.url + "/contrato/clientes/juridico"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""

        fetch(url ,
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
                    data : resp
                })
            })
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
            </div>

        );
    }
}