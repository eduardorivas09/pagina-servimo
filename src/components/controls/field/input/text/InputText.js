import React from 'react';
import './../input.css';

export default class InputText extends React.Component{
    render() {
        let type = 
            (   this.props.type === undefined || 
                this.props.type === null || 
                this.props.type.length <= 0
            )
                ? "text" : this.props.type;
        
        if (type !== "text" && type !== "password" && type !== "email" ){
            type = "text";
        }
        
        return (
            <div className={"input-container"}>
                <div className="input-border">
                    <input
                        type={type}
                        name={this.props.name}
                        autoComplete="off"
                        placeholder={this.props.placeholder}/>
                </div>
            </div>
        );
    }
}