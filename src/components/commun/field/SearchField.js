
import React from 'react';

export default class SearchField extends React.Component{

    render() {
        return(
            <form>
                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                    <div className="input-group">
                        <input type="search" placeholder={this.props.placeholder}
                               aria-describedby="button-addon1"
                               className="form-control border-0 bg-light" onChange={this.props.onSearchChange}/>
                        <div className="input-group-append">
                            <button id="button-addon1" type="submit"
                                    className="btn btn-link text-primary" onClick={this.props.onSubmit}>
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}