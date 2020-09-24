import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getDashboard} from '../../../redux/actions/DashboardActions';
import _ from 'lodash';

const MyStyle = {
    issuesCreated: {backgroundColor:'#000066',color:'#ffffff'},
    ticketsOpened: {backgroundColor:'#000066',color:'#ffffff'},
    tasksOpened: {backgroundColor:'#000066',color:'#ffffff'},
    issuesClosed: {backgroundColor:'#000066',color:'#ffffff'}
};

class SupportDashBoard extends Component {
    
    state = { activeIndex: 0 }

    async componentDidMount () {
        await this.props.getDashboard();
    }

    getUnresolvedIssues = (issues) => {
        let result = null;
        if(_.isEmpty(issues)) {
            result = 0;
        }
        else {
            result = _.size(_.filter(issues, function(issue) { 
                if (issue.issueStatus === 'OPENED') 
                return issue 
            }));
        }       
        return result;
    }

    render() { 
        return ( 
            <>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Issues</span>
                    <span className="detail">Number of Opened Issues</span>
                    <span className="count issues">{this.getUnresolvedIssues(this.props.ISSUES)}</span> 
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Tickets</span>
                    <span className="detail">Number of Tickets Opened</span>
                    <span className="count tickets">534</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Tasks</span>
                    <span className="detail">Tasks to be done.</span>
                    <span className="count tasks">3,200</span>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={MyStyle.issuesCreated}><span>  <i className="pi pi-search"/></span></div>
                    <div className="highlight-details ">                      
                        <span>Issues Created</span>
                        <span className="count">523</span>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={MyStyle.ticketsOpened}><span>  <i className="pi pi-question-circle"/></span></div>
                    <div className="highlight-details ">                      
                        <span>Tickets Opened</span>
                        <span className="count">81</span>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={MyStyle.tasksOpened}><span><i className="pi pi-filter"/></span></div>
                    <div className="highlight-details ">
                       
                        <span>Open Issues</span>
                        <span className="count">21</span>
                    </div>
                </div>
            </div>
            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={MyStyle.issuesClosed}><span><i className="pi pi-check"/></span></div>
                    <div className="highlight-details ">                      
                        <span>Closed Issues</span>
                        <span className="count">60</span>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-12 p-lg-12">    
              
            </div>    
            </>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        ISSUES: Object.values(state.ISSUES.issuesResponse),     
        DASHBOARD: state.DASHBOARD.dashboardResponse
    };
};

const mapDispatchToProps = {getDashboard};

export default connect(mapStateToProps, mapDispatchToProps)(SupportDashBoard);