import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
//import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';

class TicketInfo extends Component {
    state = { } 
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <Panel header="Ticket Information">
                        <Fieldset legend='Ticket'>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="id">ID</label>
                                    <InputText id="id" type="text" defaultValue={this.props.TICKET.id} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="ticketid">Ticket ID</label>
                                    <InputText id="ticketid" type="text" defaultValue={this.props.TICKET.ticketId} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateopened">Date Opened</label>
                                    <InputText id="dateopened" type="text" defaultValue={this.props.TICKET.dateOpened} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateclosed">Date Closed</label>
                                    <InputText id="dateclosed" type="text" defaultValue={_.isEmpty(this.props.TICKET.dateClosed) ? 'NONE' : this.props.TICKET.dateClosed} readOnly />
                                </div>
                            </div>
                        </Fieldset>
                        <Fieldset legend='Issue'>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="issueid">Issue ID</label>
                                    <InputText id="issueid" type="text" defaultValue={this.props.TICKET.issueTickets.id} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="issue">Ticket ID</label>
                                    <InputText id="issue" type="text" defaultValue={this.props.TICKET.issueTickets.issueId} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateReported">Date Reported</label>
                                    <InputText id="dateReported" type="text" defaultValue={this.props.TICKET.issueTickets.dateReported} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="reportedBy">Reported By</label>
                                    <InputText id="reportedBy" type="text" defaultValue={this.props.TICKET.issueTickets.reportedBy} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="subject">Subject</label>
                                    <InputText id="subject" type="text" defaultValue={this.props.TICKET.issueTickets.subject} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="email">Email Provided</label>
                                    <InputText id="email" type="text" defaultValue={this.props.TICKET.issueTickets.emailProvided} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-4">
                                    <label htmlFor="issuestatus">Issue Status</label>
                                    <InputText id="issuestatus" type="text" defaultValue={this.props.TICKET.issueTickets.issueStatus} readOnly />
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea id="description" rows={3} cols={30} autoResize={true} defaultValue={this.props.TICKET.issueTickets.description} readOnly />
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
    const { ticketid } = ownProps.match.params;
    return {
        TICKET: state.TICKETS.ticketsResponse[ticketid]
    };
};

export default connect(mapStateToProps, null)(TicketInfo);