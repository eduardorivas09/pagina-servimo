import React, {Fragment} from 'react';
import './main.css';
import $ from 'jquery';
import menu from '../../icons/icons8-menu-24.png';
import ClienteNatural from "../clientes/natural/ClienteNatural";
import BreadCrumb from "../nav/breadcrumb/BreadCrumb";
import ClienteJuridico from "../clientes/juridico/ClienteJuridico";
import ContratoClientesJuridico from "../contratoclientesjuridico/ContratoClientesJuridico";

export default class Main extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedItem : "",
            tree :  [
                {
                    id: 1,
                    text: "Main",
                    href: "/main",
                    isActive: true
                }
            ]
        }

        this.onItemClick = this.onItemClick.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);

    }

    pushObject(event){

        let tree = this.state.tree;
        let firstNode = this.state.tree[0];
        let selectedItem = event.target.textContent;

        if (selectedItem === this.state.selectedItem)
            return

        tree= []

        tree.push(firstNode);

        let arr = selectedItem.split(' ')

        arr.forEach(e => {
            const lastObject = tree[tree.length -1];
            lastObject.isActive = false;
            tree.push({
                id: (lastObject.id + 1),
                text: e.replace(e.charAt(0),e.charAt(0).toUpperCase()),
                href: "/" + e.toLowerCase(),
                isActive: true
            })
        });

        const lastObject = tree[tree.length -1];
        this.setState({
            selectedItem : selectedItem,
            tree : tree
        })
    }

    onItemClick(e){

        this.pushObject(e)

    }

    onClickMenu(e){
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    }
    render() {
        return(
            <div className="wrapper">

                {/*Side bar*/}
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Servimo SA</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Administracion</p>
                        <li className="active">
                            <a href="#clienteSubmenu" data-toggle="collapse" aria-expanded="false"
                               className="dropdown-toggle">Clientes</a>
                            <ul className="collapse list-unstyled" id="clienteSubmenu">
                                <li>
                                    <a onClick={this.onItemClick}>Clientes Natural</a>
                                </li>
                                <li>
                                    <a onClick={this.onItemClick} >Clientes Juridicos</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#contratoSubmenu" data-toggle="collapse" aria-expanded="false"
                               className="dropdown-toggle">Contratos</a>
                            <ul className="collapse list-unstyled" id="contratoSubmenu">
                                <li>
                                    <a onClick={this.onItemClick}>Contrato Clientes Natural</a>
                                </li>
                                <li>
                                    <a onClick={this.onItemClick}>Contrato Clientes Juridico</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/*Contenido de la pagina*/}
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-dark" onClick={this.onClickMenu}>
                                <span><img src={menu} alt="Menu"/></span>
                            </button>
                            <BreadCrumb tree={this.state.tree}/>
                        </div>
                    </nav>
                    {
                        (this.state.selectedItem === "Clientes Natural") ? <ClienteNatural/> :
                            (this.state.selectedItem === "Clientes Juridicos") ? <Fragment><ClienteJuridico/></Fragment> :
                                (this.state.selectedItem === "Contrato Clientes Natural") ? <Fragment>Aca Contrato Clientes Natural</Fragment> :
                                    (this.state.selectedItem === "Contrato Clientes Juridico") ? <Fragment><ContratoClientesJuridico/></Fragment>  : "Servimos s.a "
                                        // <Fragment></Fragment>
                    //    agregar condicionales igual a la linea anterior

                    }
                </div>

            </div>
        );
    }

}