import React, {Component} from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch, Route} from 'react-router-dom';
import history from "../../../routes/history";
import IssueMaintenanceDataTable from './IssueMaintenanceDataTable';
import AddNewIssue from './AddNewIssue';
import AssignedSupport from './AssignedSupport';
import CategoryPage from './CategoryPage';
import _ from 'lodash';
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
        selectedIssue: null,
        breadcrumdItems: [
            {label: 'Issues'},
            {label: 'Issue Maintenance'},
            // {label:'Issue Details'},           
            // {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
        ],
        home: {
            icon: 'pi pi-home', command: () => {history.push('/app/');}
        },

        tieredItems: [
            {
                label: 'Issue',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New Issue',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}newissue`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Issues',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}`
                    }
                ]
            },
            {
                label: 'Supports',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Assigned Support',
                        icon: 'pi pi-fw pi-user-plus',
                        url: `${urlparam}assignedsupport`

                    },
                    {
                        label: 'Removed Support',
                        icon: 'pi pi-fw pi-user-minus',

                    },

                ]
            },
            {
                label: 'Tickets',
                icon: 'pi pi-fw pi-ticket',
                items: [
                    {
                        label: 'Open Ticket',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}`

                    },
                    {
                        label: 'Close Ticket',
                        icon: 'pi pi-fw pi-times',
                        url: `${urlparam}`
                    },

                ]
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

    // componentDidMount(){
    //     console.log("location :"+window.location.origin);
    // }

    chooseIssue = (issue) => {
        if (!_.isEmpty(issue)) {
            this.setState({selectedIssue: issue});
        }
    };

    render() {
        let id;
        if(!_.isEmpty(this.state.selectedIssue)) {
           // console.log('selected Issue ID :' + JSON.stringify(this.state.selectedIssue.issueId));
            id = this.state.selectedIssue.issueId;
        }
        //console.log(id);
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
                            <Route path="/app/issuemaintenance/"                           
                                exact render={(props) => <IssueMaintenanceDataTable {...props} issueChoose={this.chooseIssue} checkName='IssueMaintenance'/>}
                            />
                            <JimRoute path="/app/issuemaintenance/newissue" component={AddNewIssue} checkName='IssueMaintenance' />
                            <JimRoute path="/app/issuemaintenance/assignedsupport" 
                                render={(props) => <AssignedSupport {...props} issueChooseId={id} />} checkName='IssueMaintenance'/>
                            <JimRoute path="/app/issuemaintenance/categories"  component={CategoryPage} checkName='IssueMaintenance'/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueMaintenancePage;