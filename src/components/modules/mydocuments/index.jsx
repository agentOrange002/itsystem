import React, { Component } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import MyIssuesPage from './MyIssuesPage';

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

const urlparam = `${window.location.origin}/#/app/mydocuments/`;

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
                label: 'Issues',
                icon: 'pi pi-fw pi-folder',
                // command: () => { }
            },
            {
                label: 'Tickets',
                icon: 'pi pi-fw pi-folder',
                // command: () => { }
            },
            {
                label: 'Tasks',
                icon: 'pi pi-fw pi-folder',
                // command: () => { }
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
                                <Route path="/app/mydocuments/" exact component={MyIssuesPage} />                               
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