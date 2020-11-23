import React from 'react';

export default class BreadCrumb extends React.Component{
    render() {
        return(
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    {
                        this.props.tree.map(key => {
                            return <li className="breadcrumb-item">
                                <a href={this.props.tree[key].href}>{this.props.tree[key].text}</a>
                            </li>
                        })
                    }
                </ul>
            </nav>
        );
    }
}