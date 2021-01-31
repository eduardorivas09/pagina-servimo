import React from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import ClienteJuridico from "./juridico/ClienteJuridico";
import ClienteNatural from "./natural/ClienteNatural";

export default class Customer extends React.Component{


    constructor() {
        super();
        this.state = {
            activeIndex : 0
        }
    }

    changeTabIndex = () =>{
        this.setState({activeIndex: this.props.activeIndex});
    }

    componentDidMount() {
        this.changeTabIndex();
    }

    render() {

        return (
            <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                <TabPanel header="Cliente Natural">
                    <ClienteNatural/>
                </TabPanel>
                <TabPanel header="Cliente Juridico">
                    <ClienteJuridico/>
                </TabPanel>
            </TabView>

        );
    }

}