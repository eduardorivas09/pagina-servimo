import React from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

/**
 * @class GenericModal es una clase que permite mostrar una pantalla en forma de modal.
 * @export default GenericModal
 * @export Component
 */
export default class GenericModal extends React.Component{


    constructor(props) {
        super(props);
        this.props = props;
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
                {this.props.body}
            </Dialog>
        );
    }

}