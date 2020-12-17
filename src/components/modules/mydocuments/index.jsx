import React, { Component } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";
import IssueDataScroller from './IssueDataScroller';
import {Route,Switch,Redirect} from 'react-router-dom';
import IssueLogsPage from './IssueLogsPage';

const MyStyle = { 
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

const urlparam = `${window.location.origin}/#/app/mydocuments/`;

class MyDocuments extends Component {
    state = {
        breadcrumdItems: [
            { label: 'My Documents',url: `${urlparam}`},            
        ],
        home: {
            icon: 'pi pi-home', command: () => { history.push('/app/'); }
        }      
    }

    render() {
        return (
          <>
            <div style={MyStyle.breadcrumbBG}>
              <BreadCrumb
                style={MyStyle.breadcrumb}
                model={this.state.breadcrumdItems}
                home={this.state.home}
              />
            </div>
            <div className="layout-main-inside">
              <div className="p-grid p-fluid">
                <div className="p-col-12">
                  <Switch>
                    <Route path="/app/mydocuments/" exact component={IssueDataScroller}/>
                    <Route path="/app/mydocuments/viewlogs/:issueid" component={IssueLogsPage}/>
                    <Redirect from="/app/mydocuments/*" to="/app/notfound" />
                  </Switch>
                </div>
              </div>
            </div>
          </>
        );
    }
}

export default MyDocuments;