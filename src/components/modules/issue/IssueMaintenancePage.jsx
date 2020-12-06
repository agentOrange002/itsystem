import React, {Component} from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Redirect} from 'react-router-dom';
import history from "../../../routes/history";
import IssueMaintenanceDataTable from './IssueMaintenanceDataTable';
import AddNewIssue from './AddNewIssue';
import CategoryPage from './CategoryPage';
import IssueInfo from './IssueInfo';
import AuthorizedRoute from '../../../routes/AuthorizedRoute';

const urlparam = `${window.location.origin}/#/app/issuemaintenance/`;

const MyStyle = {    
    paddingT : {
        paddingTop: '.5em'
    } ,
    breadcrumbBG:{background: '#000066'},
    menubar:{background: '#191919'}
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
            <>           
            <BreadCrumb style={MyStyle.breadcrumbBG} model={this.state.breadcrumdItems} home={this.state.home} />
            <div className='layout-main-inside'>
            <div className="p-grid p-fluid">
                <div className="p-col-12" >           
                 <Menubar style={MyStyle.menubar} model={this.state.tieredItems} /> 
                    <div style={MyStyle.paddingT}>
                        <Switch>                           
                            <AuthorizedRoute path="/app/issuemaintenance/" exact component={IssueMaintenanceDataTable} checkName='IssueMaintenance'/>
                            <AuthorizedRoute path="/app/issuemaintenance/newissue" component={AddNewIssue} checkName='IssueMaintenance' />                         
                            <AuthorizedRoute path="/app/issuemaintenance/categories"  component={CategoryPage} checkName='IssueMaintenance'/>
                            <AuthorizedRoute path="/app/issuemaintenance/view/:issueid"  component={IssueInfo} checkName='IssueMaintenance'/>
                            <Redirect from="/app/issuemaintenance/**" to="/app/notfound" />                             
                        </Switch>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

export default IssueMaintenancePage;