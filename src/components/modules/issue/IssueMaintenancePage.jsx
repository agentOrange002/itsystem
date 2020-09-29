import React, {Component} from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import IssueMaintenanceDataTable from './IssueMaintenanceDataTable';
import AddNewIssue from './AddNewIssue';
import CategoryPage from './CategoryPage';
import IssueInfo from './IssueInfo';
import JimRoute from '../../../routes/jimroute';

const urlparam = `${window.location.origin}/#/app/issuemaintenance/`;

const MyStyle = { 
    paddingB : {
        paddingBottom: '.5em'
    } ,
    paddingT : {
        paddingTop: '.5em'
    } 
}

class IssueMaintenancePage extends Component {

    state = {
      
        breadcrumdItems: [
            {label: 'Issues'},
            {label: 'Issue Maintenance'},          
        ],
        home: {
            icon: 'pi pi-home', command: () => {history.push('/app/');}
        },

        tieredItems: [
            {
                label: 'All Issues',
                icon: 'pi pi-fw pi-table',
                url: `${urlparam}`
            },
            {
                label: 'Add New Issue',
                icon: 'pi pi-fw pi-plus',
                url: `${urlparam}newissue`
            },             
            {
                label: 'Category',
                icon: 'pi pi-fw pi-folder',
                url: `${urlparam}categories`                
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
            }
        ]

    };
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
                            <JimRoute path="/app/issuemaintenance/" exact component={IssueMaintenanceDataTable} checkName='IssueMaintenance'/>
                            <JimRoute path="/app/issuemaintenance/newissue" component={AddNewIssue} checkName='IssueMaintenance' />                         
                            <JimRoute path="/app/issuemaintenance/categories"  component={CategoryPage} checkName='IssueMaintenance'/>
                            <JimRoute path="/app/issuemaintenance/view/:issueid"  component={IssueInfo} checkName='IssueMaintenance'/>
                            <Redirect from="/app/issuemaintenance/**" to="/app/notfound" />                             
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueMaintenancePage;