import React from 'react';
import $ from 'jquery';

export default class Modal extends React.Component {

    constructor() {
        super();
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal = () => {
        $('#modal').modal('hide')
    }

    render() {
        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Usuario o contraseña incorrectos</h5>
                            <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.closeModal}
                            />
                        </div>
                        <div className="modal-body">
                            EL usuario o contraseña ingresados no son correctos.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={this.closeModal}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}