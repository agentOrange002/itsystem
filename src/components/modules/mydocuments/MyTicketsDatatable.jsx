import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {ContextMenu} from 'primereact/contextmenu';

class MyTicketsDatatable extends Component {
    state = {  
        data: [],
        selectedIssue: null,
        menu: [
            {
                label: 'View this ticket', 
                icon: 'pi pi-fw pi-folder', 
                command: (event) => console.log()
            },
            {
                label: 'Close this ticket', 
                icon: 'pi pi-fw pi-times', 
                command: (event) => console.log()
            },
           
        ]
    }
    hideContext = () => {
        this.setState({selectedIssue: null});
    }

    refreshTable = (event) => {
        event.preventDefault(); console.log("refresh table");
    }

    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>;
        }
        else {

            if (data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((issue, i) => <li key={issue.issueId}>{issue.issueId + ' - ' + issue.id + ' - ' + issue.subject + ' - ' + issue.issueStatus + ' - ' + issue.description}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected Issue: {data.issueId + ' - ' + data.id + ' - ' + data.subject + ' - ' + data.issueStatus + ' - ' + data.description}</div>

        }
    }    
    
    render() { 
        const paginatorLeft = <Button icon="pi pi-refresh" onClick={this.refreshTable}/>;   
        return ( 
            <div className="content-section implementation">             
                <ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <DataTable
                    value={this.state.data}
                    scrollable={true}
                    selectionMode="single"                 
                    footer={this.displaySelection(this.state.selectedIssue)}
                    selection={this.state.selectedIssue}                   
                    onSelectionChange={e => {
                        this.setState({selectedIssue: e.value});
                        this.props.issueChoose(e.value);
                    }}
                    paginator={true}
                    paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    contextMenuSelection={this.state.selectedIssue} onContextMenuSelectionChange={e => this.setState({selectedIssue: e.value})}
                    onContextMenu={e => this.cm.show(e.originalEvent)}>   
                    <Column field="id" header="ID" style={{width: '100px'}} />
                    <Column field="issueStatus" header="Status" style={{width: '100px'}} />
                    <Column field="issueId" header="Issue ID" style={{width: '150px'}} />
                    <Column field="subject" header="Subject" style={{width: '250px'}} />
                    {/* <Column field="description" header="Description" style={{width:'550px'}} /> */}
                    <Column field="reportedBy" header="Reported By" style={{width: '250px'}} />
                    <Column field="emailProvided" header="E-mail" style={{width: '250px'}} />
                    <Column field="dateReported" header="Date Reported" style={{width: '250px'}} />
                </DataTable>               
            </div>
         );
    }
}
 
export default MyTicketsDatatable;