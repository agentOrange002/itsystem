import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';

class IssueInfo extends Component {
    state = {}
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <Panel header="Issue Information">                       
                        <Fieldset legend='Issue'>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="issueid">Issue ID</label>
                                    <InputText id="issueid" type="text" defaultValue={this.props.ISSUE.id} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="issue">Ticket ID</label>
                                    <InputText id="issue" type="text" defaultValue={this.props.ISSUE.issueId} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateReported">Date Reported</label>
                                    <InputText id="dateReported" type="text" defaultValue={this.props.ISSUE.dateReported} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="reportedBy">Reported By</label>
                                    <InputText id="reportedBy" type="text" defaultValue={this.props.ISSUE.reportedBy} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="subject">Subject</label>
                                    <InputText id="subject" type="text" defaultValue={this.props.ISSUE.subject} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="email">Email Provided</label>
                                    <InputText id="email" type="text" defaultValue={this.props.ISSUE.emailProvided} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="issuestatus">Issue Status</label>
                                    <InputText id="issuestatus" type="text" defaultValue={this.props.ISSUE.issueStatus} readOnly />
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea id="description" rows={3} cols={30} autoResize={true} defaultValue={this.props.ISSUE.description} readOnly />
                                </div>
                            </div>
                        </Fieldset>
                    </Panel>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { issueid } = ownProps.match.params;
    return {
        ISSUE: state.ISSUES.issuesResponse[issueid]
    };
};

export default connect(mapStateToProps, null)(IssueInfo);