import React, { Component } from 'react';
//import MyIssuesDatatables from './MyIssuesDatatable';
import IssueDataScroller from './IssueDataScroller';

class MyIssuesPage extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <IssueDataScroller />
            </>
         );
    }
}
 
export default MyIssuesPage;