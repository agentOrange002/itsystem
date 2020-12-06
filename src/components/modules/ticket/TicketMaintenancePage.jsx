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
    paddingT: {paddingTop: '.5em'},
    breadcrumbBG:{background: '#000066'},
    menubar:{background:'#191919'}
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
            <>            
            <BreadCrumb style={MyStyle.breadcrumbBG} model={this.state.breadcrumdItems} home={this.state.home} />
            <div className='layout-main-inside'>
            <div className="p-grid p-fluid">
                <div className="p-col-12" >  
                    <Menubar style={MyStyle.menubar} model={this.state.tieredItems} />
                    <div style={MyStyle.paddingT}>                        
                        <Switch>
                            <AuthorizedRoute path="/app/ticketmaintenance/" exact component={TicketMaintenanceDatatable} checkName='TicketMaintenance'/>
                            <AuthorizedRoute path="/app/ticketmaintenance/view/:ticketid" component={TicketInfo} checkName='TicketMaintenance' />                           
                            <Redirect from="/app/ticketmaintenance/*" to="/app/notfound" /> 
                        </Switch>
                    </div>
                </div>
            </div>      
            </div>   
            </>   
         );
    }
}
 
export default TicketMaintenancePage;