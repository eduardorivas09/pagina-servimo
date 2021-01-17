import React from 'react';
import './submitButton.css'

export default class SubmitButton extends React.Component{
    render() {
        return (
            <div className="input-container woc">
                <input className="button" type="submit" value={this.props.text}/>
            </div>
        );
    }
}