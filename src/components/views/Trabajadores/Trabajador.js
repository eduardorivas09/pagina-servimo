
import React, { Fragment, useState } from 'react';


export default class Trabajador extends React.Component {


    constructor(props) {

        super(pros);
        this.state = {
            showModal: false,
            busqueda: "",
            data: [],
            selectedRow: null,
            rowid: -1,
            ModalProps: {
                modalHeader: null,
                modalMessage: null,
                modalType: 'info',
                visible: false

            }
        }

    }

    buscar(e) {
        e.preventDefaul();
        if (this.state.busqueda.trim().length > 0) {
             
        }
    }


    loadData(search) {
        new TrajadoresService()
            .getFiltered(search)
            .then(resp => {
                if (resp instanceof Response && resp.status === 2000 || resp instanceof Array) {
                    console.log(resp)
                    this.setState({
                        data: resp
                    })
                }
            })
            .catch(e => {

                if (e instanceof Error) {
                    this.setState({
                        ModalProps: {
                            modalHeader: 'Acceso denegado',
                            modalMessage : e.message,
                            modalType: 'warnig',
                            visible: true
                        }

                    });
                }

            });

    }


    
    render() {

        return (
            <Fragment>
                <h1>
                    hola mundo
                </h1>
            </Fragment>
        );

    }
}
