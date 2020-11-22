import  React from 'react';

export default class  NavItem extends  React.Component{
    constructor() {
        super();
        this.state = {
            active : false
        }
    }

    render() {
        return(
            <li className={(this.state.active == true) ? "nav-item active" : "nav-item"}>
                <a href={this.props.href} className="nav-link">{this.props.text}</a>
            </li>
        );
    }
}