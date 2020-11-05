import React, { Component } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

const MyStyle = {
    divPaddingTop: { paddingBottom: '.5em' },
    paddingTop: { paddingTop: '.5em' },
    divTopPx: { paddingTop: "20px" },
    width: { width: "100%" },
    tooltip: { position: 'top' },
    dialogstyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    shortdialogstyle: { width: '20vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    ticketdialogstyle: { width: '350px', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    breadcrumbBG:{background: '#191919'}
}

class MyDocuments extends Component {
    state = {
        breadcrumdItems: [
            { label: 'My Documents' },
            { label: 'User' },
        ],
        home: {
            icon: 'pi pi-home', command: () => { history.push('/app/'); }
        },

        tieredItems: [
            {
                label: 'Find Issue',
                icon: 'pi pi-fw pi-search',
                command: () => this.setState({ visible: true })
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print',
                command: () => { this.printIssue(); }
            },
            {
                label: 'Create Ticket',
                icon: 'pi pi-fw pi-plus',
                command: (event) => this.createTicket()
            },

        ]
    }
    render() {
        return (
            <>
              <div className="p-grid p-fluid">
                    <div className="p-col-12" >
                        <div style={MyStyle.divPaddingTop}>
                            <BreadCrumb style={MyStyle.breadcrumbBG} model={this.state.breadcrumdItems} home={this.state.home} />
                        </div>
                        <div>
                            <Menubar style={MyStyle.breadcrumbBG} model={this.state.tieredItems} >
                                <Button label="Add Message" icon="pi pi-plus" 
                                    disabled/>
                            </Menubar >
                        </div>
                        <div>
                            <Switch>                           
                                <Route path="/app/mydocuments/" exact component={IssueMaintenanceDataTable} />                               
                                <Redirect from="/app/mydocuments/**" to="/app/notfound" />                             
                            </Switch>
                        </div>                        
                    </div>
                </div>
            </>
        );
    }
}

export default MyDocuments;