import React, { Component } from 'react';

import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';

import {connect} from 'react-redux';

import _ from 'lodash';

class SupportDashBoard extends Component {
    state = {  }

    getUnresolvedIssues = (issues) => {
        let result = null;
        if(_.isEmpty(issues)) {
            result = 0;
        }
        else {
            result = _.size(_.filter(issues, function(issue) { if (issue.issueStatus == 'OPENED') return o }));
        }       
        return result;
    }

    render() { 
        return ( 
            <>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Issues</span>
                    <span className="detail">Number of Unresolved Issues</span>
                    <span className="count visitors">{this.getUnresolvedIssues(this.props.ISSUES)}</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Tickets</span>
                    <span className="detail">Number of Tickets Opened</span>
                    <span className="count purchases">534</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Tasks</span>
                    <span className="detail">Tasks to be done.</span>
                    <span className="count revenue">3,200</span>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}><span>TV</span></div>
                    <div className="highlight-details ">
                        <i className="pi pi-search"/>
                        <span>Total Queries</span>
                        <span className="count">523</span>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}><span>TI</span></div>
                    <div className="highlight-details ">
                        <i className="pi pi-question-circle"/>
                        <span>Total Issues</span>
                        <span className="count">81</span>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}><span>OI</span></div>
                    <div className="highlight-details ">
                        <i className="pi pi-filter"/>
                        <span>Open Issues</span>
                        <span className="count">21</span>
                    </div>
                </div>
            </div>
            <div className="p-col-12 p-md-6 p-xl-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}><span>CI</span></div>
                    <div className="highlight-details ">
                        <i className="pi pi-check"/>
                        <span>Closed Issues</span>
                        <span className="count">60</span>
                    </div>
                </div>
            </div>

      
                <Panel header="Activity" style={{height:'100%'}}>
                    <div className="activity-header">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <span style={{fontWeight:'bold'}}>Last Activity</span>
                                <p>Updated 1 minute ago</p>
                            </div>
                            <div className="p-col-6" style={{textAlign:'right'}}>
                                <Button label="Refresh" icon="pi pi-refresh" />
                            </div>
                        </div>
                    </div>

                    <ul className="activity-list">
                        <li>
                            <div className="count">$900</div>
                            <div className="p-grid">
                                <div className="p-col-6">Income</div>
                                <div className="p-col-6">95%</div>
                            </div>
                        </li>
                        <li>
                            <div className="count" style={{backgroundColor:'#f9c851'}}>$250</div>
                            <div className="p-grid">
                                <div className="p-col-6">Tax</div>
                                <div className="p-col-6">24%</div>
                            </div>
                        </li>
                        <li>
                            <div className="count" style={{backgroundColor:'#20d077'}}>$125</div>
                            <div className="p-grid">
                                <div className="p-col-6">Invoices</div>
                                <div className="p-col-6">55%</div>
                            </div>
                        </li>
                        <li>
                            <div className="count" style={{backgroundColor:'#f9c851'}}>$250</div>
                            <div className="p-grid">
                                <div className="p-col-6">Expenses</div>
                                <div className="p-col-6">15%</div>
                            </div>
                        </li>
                        <li>
                            <div className="count" style={{backgroundColor:'#007be5'}}>$350</div>
                            <div className="p-grid">
                                <div className="p-col-6">Bonus</div>
                                <div className="p-col-6">5%</div>
                            </div>
                        </li>
                        <li>
                            <div className="count" style={{backgroundColor:'#ef6262'}}>$500</div>
                            <div className="p-grid">
                                <div className="p-col-6">Revenue</div>
                                <div className="p-col-6">25%</div>
                            </div>
                        </li>
                    </ul>
                </Panel>
            


            </>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        ISSUES: Object.values(state.ISSUES.issuesResponse),     
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SupportDashBoard);