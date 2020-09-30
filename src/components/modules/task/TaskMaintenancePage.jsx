import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import history from "../../../routes/history";
import TaskMaintenanceDatatable from './TaskMaintenanceDatatable';
import TaskInfo from './TaskInfo';
import {Switch,Redirect} from 'react-router-dom';
import AuthorizedRoute from '../../../routes/AuthorizedRoute';

const urlparam = `${window.location.origin}/#/app/taskmaintenance/`;

const MyStyle = {
    paddingB: {paddingBottom: '.5em'},
    paddingT: {paddingTop: '.5em'} 
}

class TaskMaintenancePage extends Component {
    state = { 
        breadcrumdItems: [
            {label: 'Task'},
            {label: 'Task Maintenance'},            
        ],
        home: {
            icon: 'pi pi-home', command: () => {history.push('/app/');}
        },
        tieredItems: [
            {
                label: 'All Task',
                icon: 'pi pi-fw pi-file',
                url: `${urlparam}`,
                  
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
                            <AuthorizedRoute path="/app/taskmaintenance/" exact component={TaskMaintenanceDatatable} checkName='TaskMaintenance'/>
                            <AuthorizedRoute path="/app/taskmaintenance/view/:taskid" component={TaskInfo} checkName='TaskMaintenance' />                           
                            <Redirect from="/app/taskmaintenance/*" to="/app/notfound" /> 
                        </Switch>
                    </div>
                </div>
            </div>            
         );
    }
}
 
export default TaskMaintenancePage;