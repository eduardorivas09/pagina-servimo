import React, {Fragment} from 'react';
import Table from "../../../controls/table/Table";
import {UsuarioService} from "../../../../services/seguridad/UsuarioService";
import {RoleService} from "../../../../services/seguridad/RoleService";
import DialogModal from "../../alerts/DialogModal";

export default class RolesView extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            modalProps : {
                modalHeader : null,
                modalMessage : null,
                modalType : 'info',
                visible : false
            }

        }
        this.addRole = this.addRole.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    }

    /**
     * Metodo que carga los datos, estos pueden proceder de una busqueda
     * @param search parametro que sirve como filtro de la busqueda.
     */
    loadData(search) {

        new RoleService()
            .getAll()
            .then(resp => {
                if ((resp instanceof Response && resp.status === 200) || resp instanceof Array){
                    console.log(resp)
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
     * Metodo que retorna las columnas que puede mostrar la tabla
     * @returns {[{field: string, header: string, sortable: boolean}, {field: string, header: string, sortable: boolean}, {field: string, header: string, sortable: boolean}]}
     */
    visibledColumns = () => {
        return [
            {
                field:"rol",
                header:"Nombre del rol",
                sortable:true
            },{
                field:"descripcion",
                header:"Descripcion",
                sortable:true
            },{
                field:"fechaCreacion",
                header:"Fecha Creacion",
                sortable:true
            }
        ]
    }

    /**
     * Metodo que abre la pantalla de modal al dar click en el boton en agregar.
     */
    addRole = () => {

    }

    /**
     * Metodo que abre el modal para editar un registro al momento de dar click en una fila.
     * @param e
     */
    onRowDoubleClick = (e) => {
        this.openEditModal(e);
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

    /**
     * Metodo que se ejecuta al cuando el componente fue renderizado y en este mismo se cargan los datos a la tabla.
     */
    componentDidMount() {
        this.loadData();
    }

    /**
     * Reneriza el componente
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Fragment>
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       // onClickAdd={this.addRole}
                       onRowDoubleClick={this.onRowDoubleClick}
                       entity="Rol"/>

                {/*Modal de dialogo*/}
                <DialogModal header={this.state.modalProps.modalHeader}
                             textBody={this.state.modalProps.modalMessage}
                             hasYesNotButtons={false}
                             modalType={this.state.modalProps.modalType}
                             visible={this.state.modalProps.visible}
                             onHide={this.onHide}/>
            </Fragment>
        );
    }
}
