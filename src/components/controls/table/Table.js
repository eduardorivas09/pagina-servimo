import React, {Fragment} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {ContextMenu} from "primereact/contextmenu";
import './ResponsiveTable.css';

/**
 * COMPONENTE Table
 *
 * PARAMETROS:
 *
 * columns [Obligatorio]: Columnas que se mostraran en la tabla. e.j
 *      columns = [{'field':'IDProducto', 'header':'Identificador Producto', 'sortable':true},]
 *
 * entity [Obligatorio]: Nombre de la entidad e.j:
 *      entity = 'Clientes'
 *
 * promise [Obligatorio]: Lista de datos en formato JSon e.j
 *      promise = [{'id':'1','nombre':'Felipe'}, {'id':'2','nombre':'Maria'}, {'id':'3','nombre':'Luis'}]
 */

export default class Table extends React.Component {

    /**
     * Constructor de la clase en la que se inicializan la propiedad de la menuModel.
     * Ademas se establecen los estados que se manejaran en la clase.
     */
    constructor() {
        super();
        this.state = {
            data: [],           //Lista de Datos que contendra la tabla
            currentPage: 0,    //Integer que almacena la Pagina actual correspondiente a la paginacion
            tableFilter: null, //String que almacena el valor que se escribe en la barra de busqueda.
            selectedRow: null  //Objeto Json correspondiente a la fila seleccionada en la Tabla.
        };

        //Propiedad de la clase que almacena las acciones que se pueden hacer al dar click derecho sobre una fila.
        this.menuModel = [
            {label: 'Ver', icon: 'pi pi-fw pi-search', command: () => this.viewSelectedRow(this.state.selectedRow)},
            {
                label: 'Eliminar',
                icon: 'pi pi-fw pi-times',
                command: () => this.deleteSelectedRow(this.state.selectedRow)
            }
        ];

        this.viewSelectedRow = this.viewSelectedRow.bind(this);
        this.deleteSelectedRow = this.deleteSelectedRow.bind(this);
    }

    /**
     * Metodo muestra informacion de la fila seleccionada al dar en la opcion Ver del menu
     * @param objetoFila Objeto correspondiente a la fila seleccionada.
     */
    viewSelectedRow(objetoFila) {
        this.toast.show({severity: 'info', summary: this.props.entity + ' Selected', detail: objetoFila.name});
    }

    /**
     * Elimina la fila seleccionada
     * @param dt Datos de la tabla
     */
    deleteSelectedRow(dt) {
        let data = [...this.state.data];
        data = data.filter((p) => p.id !== dt.id);

        this.toast.show({severity: 'info', summary: this.props.entity + ' Deleted', detail: dt.name});
        this.setState({data});
    }

    /**
     * Metodo que devuelve las columnas de las tablas tomando como referencia a la propiedad columns que es
     * pasado como parametro a la etiqueta de la clase
     * @returns {*}
     */
    columns(){
        return this.props.columns.map(item => {
            return <Column columnKey={item.id}  field={item.field} header={item.header} sortable={item.sortable}/>
        });
    }

    responsiveColumns = (object) => {
        console.log('Hola' + object);
        return (
            <React.Fragment>
                <span className="p-column-title">object.header</span>
                {object.field}
            </React.Fragment>
        );
    }

    /**
     * Renderisa las etiquetas JSX a un formato que los navegadores pueden entender.
     * @returns {JSX.Element}
     */
    render() {
        const header = (
            <div className="table-header">
                <div className={'row'} style={{'textAlign': 'left'}}>
                    <div className="col-sm-2 col-md-6 col-lg-6 pr-0">
                        <InputText type="search" onInput={(e) => this.setState({tableFilter: e.target.value})}
                                   placeholder={"Buscar " + this.props.entity} size="50"/>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1" style={{paddingTop: '0.5em', cursor: 'pointer'}}>
                        <i className="pi pi-search" style={{margin: '4px 4px 0 0'}}/>
                    </div>
                    {
                        this.props.onClickAdd !== undefined && this.props.onClickAdd != null ?
                            <div className="col-sm-3 col-md-2 col-lg-1 offset-sm-3 offset-md-2 offset-lg-3">
                                <Button icon="pi pi-plus" label={"Agregar"} onClick={this.props.onClickAdd}/>
                            </div>
                        :
                            <Fragment />
                    }
                </div>
            </div>
        );

        const footer = `Total de ${this.props.entity} ${this.props.promise ? this.props.promise.length : 0} `;
        return (
            <div className="datatable-responsive">
                <div className="card">
                    <Toast
                        ref={(el) => {
                            this.toast = el;
                        }}>
                    </Toast>

                    <ContextMenu model={this.menuModel} ref={el => this.cm = el}
                                 onHide={() => this.setState({selectedRow: null})}/>
                    <DataTable value={this.props.promise}
                               header={header}
                               footer={footer}
                               paginator
                               rows={5}
                               first={this.state.currentPage}
                               onPage={(e) => this.setState({currentPage: e.first})}
                               globalFilter={this.state.tableFilter}
                               scrollable
                               scrollHeight="200px"
                               className="p-datatable-responsive"
                               contextMenuSelection={this.state.selectedRow}
                               onContextMenuSelectionChange={e => this.setState({selectedRow: e.value})}
                               onContextMenu={e => this.cm.show(e.originalEvent)}>
                        {this.columns()}
                    </DataTable>
                </div>
            </div>
        );
    }

}