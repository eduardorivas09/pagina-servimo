import React, {Fragment} from 'react';
import {GenericView} from "../../GenericView";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";

export default class DetallePagoView extends GenericView{
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                            <span className="p-float-label" style={{ marginTop: '1.3em' }}>
                                <InputNumber id="itCedula"
                                           value={this.state.noCedula}
                                           onChange={(e) => this.setState({ ncedula: e.target.value })}
                                           keyfilter={/[^\s]/} />
                                <label htmlFor="itCedula" style={{ fontSize: '0.8em' }}>Numero de Cedula</label>
                            </span>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}