import React, { Fragment } from 'react';
import './main.css';
import $ from 'jquery';
import ClienteNatural from "../clientes/natural/ClienteNatural";
import ClienteJuridico from "../clientes/juridico/ClienteJuridico";
import Trabajador from "../Trabajadores/Trabajador";
import { Redirect } from "react-router-dom";
import { Session } from "../../../services/seguridad/Session";
import { MenusService } from "../../../services/MenusService";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import UsuariosView from "../security/usuario/UsuariosView";
import RolesView from '../../views/security/rol/RolesView'

export default class Main extends React.Component {

    /**
     * Constructor de la clase donde se establecen los estodos y eventos vinculados al componente.
     */
    constructor() {
        super();
        this.state = {
            redirect: false,   //  Propiedad de tipo boolean que si es true la pagina se redirigira hacia el login.
            selectedItem: "",
            menuItems: [],
            currentComponent: <h1>Hola a todos</h1>
        }

        this.onClickMenu = this.onClickMenu.bind(this);
    }

    onClickMenu(e) {
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    }

    async isLogged() {
        try {
            if (!await Session.isLogged()) {
                this.setState({ redirect: true })
            }
        } catch (e) {
            this.setState({
                modalProps: {
                    modalHeader: 'Error del lado del servidor',
                    modalMessage: e.message,
                    modalType: 'warning',
                    visible: true
                }
            });
        }
    }

    render() {

        return (
            (this.state.redirect)
                ? <Redirect to='/login' />
                :
                <Fragment>
                    <Menubar model={this.state.menuItems}
                        // start={<InputText placeholder="Search" type="text"/>}
                        end={<Fragment>
                            <Menu model={this.state.popUpMenu} popup ref={el => this.menu = el} id="popup_menu" />
                            <Button label="Mas" icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
                        </Fragment>
                        }
                    />
                    <Panel>
                        {/*{this.props.view}*/}
                        {this.state.currentComponent}
                    </Panel>
                </Fragment>
        );
    }

    componentDidMount() {
        this.isLogged();

        const service = new MenusService();
        this.loadMenu(service);
        service.getPopUpMenuItems().then(resp => {
            this.setState({ popUpMenu: resp });
        });
    }

    loadMenu = async (service) => {
        try {
            await service.getMainMenuItems(this.onClickMenuItem).then(resp => {
                this.setState({ menuItems: resp });
            });
        } catch (e) {
            this.setState({
                modalProps: {
                    modalHeader: 'Error del lado del servidor',
                    modalMessage: e.message,
                    modalType: 'warning',
                    visible: true
                }
            });
        }
    }

    onClickMenuItem = (url) => {
        if (url.includes('natural')) this.setState({ currentComponent: <ClienteNatural /> })
        if (url.includes('juridico')) this.setState({ currentComponent: <ClienteJuridico /> })
        if (url.includes('Trabajadores')) this.setState({ currentComponent: <Trabajador /> });
        if (url.includes('users')) this.setState({ currentComponent: <UsuariosView /> })
        if (url.includes('roles')) this.setState({ currentComponent: <RolesView /> })

        console.log(this.state.currentComponent);
    }

}

