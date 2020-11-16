import React, { Component } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import MyIssuesPage from './MyIssuesPage';
import {Route,Switch,Redirect} from 'react-router-dom';

const MyStyle = { 
    paddingB : {
        paddingBottom: '.5em'
    } ,
    paddingT : {
        paddingTop: '.5em'
    } ,
    breadcrumbBG:{background: '#191919'}
}


const urlparam = `${window.location.origin}/#/app/mydocuments/`;

class MyDocuments extends Component {
    state = {
        breadcrumdItems: [
            { label: 'My Documents',url: `${urlparam}`},            
        ],
        home: {
            icon: 'pi pi-home', command: () => { history.push('/app/'); }
        },

        tieredItems: [
            {
                label: 'Issues',
                icon: 'pi pi-fw pi-file',
                // command: () => { }
            },
            {
                label: 'Tickets',
                icon: 'pi pi-fw pi-file',
                // command: () => { }
            },
            {
                label: 'Tasks',
                icon: 'pi pi-fw pi-file',
                // command: () => { }
            },

        ]
    }
    render() {
        return (
            <>
              <div className="p-grid p-fluid">
                    <div className="p-col-12" >
                        <div style={MyStyle.paddingB}>
                            <BreadCrumb style={MyStyle.breadcrumbBG} model={this.state.breadcrumdItems} home={this.state.home} />
                        </div>
                        <div>
                            <Menubar style={MyStyle.breadcrumbBG} model={this.state.tieredItems} >
                                <Button label="Add Message" icon="pi pi-plus" 
                                    disabled/>
                            </Menubar >
                        </div>
                        <div style={MyStyle.paddingT}>
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