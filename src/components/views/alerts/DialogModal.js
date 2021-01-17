import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import './dialogModal.css';

/**
 * AbstractModal es una clase que define las propiedades y comportamiento basico de un modal.
 */
export default class DialogModal extends React.Component {

    constructor() {
        super();
        this.renderFooter = this.renderFooter.bind(this);
    }

    renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={this.props.onClickNoButton} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={this.props.onClickYesButton} autoFocus/>
            </div>
        );
    }

    /**
     * Renderiza el componente.
     */
    render() {
        let modalType = this.props.modalType;
        if (modalType !== 'info' && modalType !== 'warning' && modalType !== 'success'){
            modalType = 'info';
        }

        return(
            <Dialog  className="p-dialog" role="alert"
                     header={this.props.header}
                     position="top-right"
                     visible={this.props.visible}
                     style={{ width: '50vw' }}
                     footer={this.props.hasYesNotButtons ? this.renderFooter() : <React.Fragment/>}
                     onHide={() => this.props.onHide()} >
                <p className={`alert alert-${modalType}`}>{this.props.textBody}</p>
            </Dialog>
        );
    }

}