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
    paddingT: {paddingTop: '.5em'},   
    menubar:{background: '#191919',height:'50px'},
    breadcrumbBG:{     
        borderStyle: 'solid',
        backgroundColor:'#000066',
        color:'#000066'
    },
    breadcrumb:{
        background:'#000066',
        borderColor:'#000066'    
    }
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
            <>
            <div style={MyStyle.breadcrumbBG} >
                <BreadCrumb style={MyStyle.breadcrumb} model={this.state.breadcrumdItems} home={this.state.home} />
            </div>
            <div className='layout-main-inside'>           
            <div className="p-grid p-fluid">
                <div className="p-col-12" >                 
                    <Menubar style={MyStyle.menubar} model={this.state.tieredItems} /> 
                    <div style={MyStyle.paddingT}>
                        <Switch>
                            <AuthorizedRoute path="/app/taskmaintenance/" exact component={TaskMaintenanceDatatable} checkName='TaskMaintenance'/>
                            <AuthorizedRoute path="/app/taskmaintenance/view/:taskid" component={TaskInfo} checkName='TaskMaintenance' />                           
                            <Redirect from="/app/taskmaintenance/*" to="/app/notfound" /> 
                        </Switch>
                    </div>
                </div>
            </div>      
            </div>    
            </>  
         );
    }
}
 
export default TaskMaintenancePage;