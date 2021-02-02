import React, {Fragment} from 'react';
import Table from "../../../controls/table/Table";
import {ClienteNaturalService} from "../../../../services/clientes/ClienteNaturalService";
import {UsuarioService} from "../../../../services/seguridad/UsuarioService";

export default class UsuariosView extends React.Component{

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
        this.addNewUser = this.addNewUser.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    }

    loadData(search) {

        new UsuarioService()
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

    /**
     * Metodo que abre la pantalla de modal al dar click en el boton en agregar.
     */
    addNewUser = () => {

    }

    /**
     * Metodo que abre el modal para editar un registro al momento de dar click en una fila.
     * @param e
     */
    onRowDoubleClick = (e) => {
        this.openEditModal(e);
    }

    render() {
        return (
            <Fragment>
                <Table promise={this.state.data}
                       columns={this.visibledColumns()}
                       onClickAdd={this.addNewUser}
                       onRowDoubleClick={this.onRowDoubleClick}
                       entity="Usuario"/>
            </Fragment>
        );
    }

}