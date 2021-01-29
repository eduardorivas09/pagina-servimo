import React, {Fragment} from 'react';
import './main.css';
import $ from 'jquery';
import menu from '../../../static/icons/icons8-menu-24.png';
import ClienteNatural from "../clientes/natural/ClienteNatural";
import BreadCrumb from "../../panels/nav/breadcrumb/BreadCrumb";
import ClienteJuridico from "../clientes/juridico/ClienteJuridico";
import ContratoClientesJuridico from "../contrato/juridico/ContratoClientesJuridico";
import {Redirect} from "react-router-dom";
import {Session} from "../../../services/seguridad/Session";
import {MenusService} from "../../../services/MenusService";
import {Menubar} from "primereact/menubar";
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import Customer from "../clientes/Customer";

export default class Main extends React.Component{

    /**
     * Constructor de la clase donde se establecen los estodos y eventos vinculados al componente.
     */
    constructor() {
        super();
        this.state = {
            redirect : false,   //  Propiedad de tipo boolean que si es true la pagina se redirigira hacia el login.
            selectedItem : "",
            menuItems : [],
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

    async isLogged(){
        try{
            if (!await Session.isLogged()){
                this.setState({redirect : true})
            }
        }catch(e){
            this.setState({
                modalProps : {
                    modalHeader : 'Error del lado del servidor',
                    modalMessage : e.message,
                    modalType : 'warning',
                    visible : true
                }});
        }
    }

    render() {

        return(
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
                        {this.props.view}
                    </Panel>
                </Fragment>
    );
    }

    componentDidMount() {
        this.isLogged();

        const service = new MenusService();
        service.getMainMenuItems().then(resp => {
            this.setState({menuItems : resp});
        });

        service.getPopUpMenuItems().then(resp => {
            this.setState({popUpMenu: resp});
        });
    }

}

