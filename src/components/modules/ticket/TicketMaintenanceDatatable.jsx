import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { ContextMenu } from 'primereact/contextmenu';
import _ from 'lodash';
import {getAllTickets} from '../../../redux/actions/TicketActions';
import UILoader from '../tools/UILoader';
import history from "../../../routes/history";

const MyStyle = {
    DialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    OTIDialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    ButtonDivStyle : {paddingTop: '10px', paddingBottom: "35px"},
    LoginButtonStyle : {marginRight: ".25em", float: "right"}    
}

class TicketMaintenanceDatatable extends Component {

    state = {
        data: [],
        selectedTicket: null,
        menu: [
            {
                label: 'View Ticket', 
                icon: 'pi pi-fw pi-ticket', 
                command: (event) => this.viewTicket(this.state.selectedTicket)
            }            
        ]
    }

    async componentDidMount(){
        if(_.isEmpty(this.props.TICKETS))
        {
            await this.props.getAllTickets();
        }
        
    }

    viewTicket(ticket) {
        let id = ticket.ticketId;
        history.push(`/app/ticketmaintenance/view/${id}`);
    }


    refreshTable = async (event) => {
        event.preventDefault(); 
        await this.props.getAllTickets();
    }

    hideContext = () => {
        this.setState({ selectedTicket: null });
    }

    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>;
        }
        else {

            if (data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((ticket, i) => <li key={ticket.ticketId}>{ticket.ticketId + ' - ' + ticket.id + ' - ' + ticket.dateOpened + ' - ' + ticket.dateClosed }</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected Ticket: {data.ticketId + ' - ' + data.id + ' - ' + data.dateOpened + ' - ' + data.dateClosed }</div>

        }
    }  

    footerDialog = () => {
        return (
            <div className='button' style={MyStyle.ButtonDivStyle}>
                <span>
                    <Button label='No' onClick={this.NoOOTIDialogButton} className="p-button-danger" icon='pi pi-time' style={MyStyle.LoginButtonStyle} />
                    <Button label='Yes' onClick={this.YesOTIDialogButton} className="p-button-success" icon='pi pi-check' style={MyStyle.LoginButtonStyle} />
                </span>
            </div>
        );
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh" onClick={this.refreshTable} />;
        return (           
            <div className="content-section implementation" >
                <ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <UILoader blockui="TICKET_LOADING" unblockui={["TICKET_GET_ALL","TICKET_ERROR"]}>
                <DataTable style={{textAlign:'left'}}
                    value={this.props.TICKETS}
                    scrollable={true}
                    selectionMode="single"
                    header="Tickets Maintenance Data"
                    footer={this.displaySelection(this.state.selectedTicket)}
                    selection={this.state.selectedTicket}
                    // onSelectionChange={e => this.setState({selectedTicket: e.value})}
                    onSelectionChange={e => {
                        this.setState({ selectedTicket: e.value });
                       // this.props.ticketChoose(e.value);
                    }}
                    paginator={true}
                    paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    contextMenuSelection={this.state.selectedTicket} onContextMenuSelectionChange={e => this.setState({ selectedTicket: e.value })}
                    onContextMenu={e => this.cm.show(e.originalEvent)}
                >

                    <Column field="id" header="ID" style={{ width: '100px' }} />
                    <Column field="ticketId" header="Ticket ID" style={{ width: '150px' }} />
                    <Column field="dateOpened" header="Date Opened" style={{ width: '200px' }} />
                    <Column field="dateClosed" header="Date Closed" style={{ width: '200px' }} />
                    <Column field="issueTickets.issueId" header="Issue ID" style={{width: '200px'}} />
                    <Column field="issueTickets.issueStatus" header="Issue Status" style={{width: '200px'}} />
                    <Column field="issueTickets.subject" header="Subject" style={{width: '250px'}} />
                    <Column field="issueTickets.description" header="Description" style={{width: '500px'}} /> 
                </DataTable>
                </UILoader>
            </div>
           
        );
    }
}

const mapStateToProps = state => {
    return {
        TICKETS: Object.values(state.TICKETS.ticketsResponse)       
    };
};

const mapDispatchToProps = {getAllTickets};

export default connect(mapStateToProps,mapDispatchToProps)(TicketMaintenanceDatatable);