import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import TicketMaintenanceDatatable from './TicketMaintenanceDatatable';
import TicketInfo from './TicketInfo';
import AuthorizedRoute from '../../../routes/AuthorizedRoute';

const urlparam = `${window.location.origin}/#/app/ticketmaintenance/`;

const MyStyle = {
    paddingB: {paddingBottom: '.5em'},
    paddingT: {paddingTop: '.5em'} 
}

class TicketMaintenancePage extends Component {
    state = { 
        breadcrumdItems: [
            {label: 'Ticket'},
            {label: 'Ticket Maintenance'},           
        ],
        home: {
            icon: 'pi pi-home', command: () => {history.push('/app/');}
        },
        tieredItems: [
            {
                label: 'Ticket',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New Ticket',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Tickets',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}`
                    }
                ]
            },            
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
            }
        ]

     }
    render() { 
        return ( 
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <div style={MyStyle.paddingB}>
                        <BreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
                    </div>
                    <div>
                        <Menubar model={this.state.tieredItems} />
                    </div>
                    <div style={MyStyle.paddingT}>                        
                        <Switch>
                            <AuthorizedRoute path="/app/ticketmaintenance/" exact component={TicketMaintenanceDatatable} checkName='TicketMaintenance'/>
                            <AuthorizedRoute path="/app/ticketmaintenance/view/:ticketid" component={TicketInfo} checkName='TicketMaintenance' />                           
                            <Redirect from="/app/ticketmaintenance/*" to="/app/notfound" /> 
                        </Switch>
                    </div>
                </div>
            </div>            
         );
    }
}
 
export default TicketMaintenancePage;