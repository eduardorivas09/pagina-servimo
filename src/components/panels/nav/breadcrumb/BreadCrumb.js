import React from 'react';

export default class BreadCrumb extends React.Component{
    render() {

        return(
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    {
                        this.props.tree.map(key => {
                            return (key.isActive == true) ?
                                        <li key={key.id} className="breadcrumb-item active" aria-current="page">{key.text}</li>
                                        :
                                    <li key={key.id} className="breadcrumb-item"><a href={key.href}>{key.text}</a></li>
                        })
                    }
                </ul>
            </nav>
        );
    }
}