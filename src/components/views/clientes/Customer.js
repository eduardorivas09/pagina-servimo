import React from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import ClienteJuridico from "./juridico/ClienteJuridico";
import ClienteNatural from "./natural/ClienteNatural";

export default class Customer extends React.Component{


    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <TabView activeIndex={this.props.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
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