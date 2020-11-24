import React, {Fragment} from 'react';
import './table.css'

export default class Table extends React.Component {

    constructor() {
        super();
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    getHeader = function(){
        const keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }


    getRowsData = function(){
        const RenderRow = (props) =>{
            return props.keys.map((key, index)=>{
                return <td key={this.props.data[key]}>{props.data[key]}</td>
            })
        }
        const items = this.props.data;
        const keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }


    render() {
        return (
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-hover table-bordered table-striped mb-0">
                    <thead className="thead-dark">
                    <tr>{

                        (this.props.data.length > 0) ? this.getHeader() : <Fragment></Fragment>
                    }</tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.data.length > 0) ? this.getRowsData() :  <Fragment></Fragment>
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}