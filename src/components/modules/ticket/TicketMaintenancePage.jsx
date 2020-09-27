import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch} from 'react-router-dom';
import history from "../../../routes/history";
import TicketMaintenanceDatatable from './TicketMaintenanceDatatable';
import TicketInfo from './TicketInfo';
import JimRoute from '../../../routes/jimroute';

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
                        <Menubar model={this.state.tieredItems}>                            
                           {/* // <Button label="Assigned Support" icon="pi pi-user-plus" style={{marginLeft:4}}/> */}
                        </Menubar>
                    </div>
                    <div style={MyStyle.paddingT}>                        
                        <Switch>
                            <JimRoute path="/app/ticketmaintenance/" exact component={TicketMaintenanceDatatable} checkName='TicketMaintenance'/>
                            <JimRoute path="/app/ticketmaintenance/view/:ticketid" component={TicketInfo} checkName='TicketMaintenance' />                           
                        </Switch>
                    </div>
                </div>
            </div>            
         );
    }
}
 
export default TicketMaintenancePage;