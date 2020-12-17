import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { ContextMenu } from 'primereact/contextmenu';
import _ from 'lodash';
import {getAllTasks} from '../../../redux/actions/TaskActions';
import UILoader from '../tools/UILoader';
import history from "../../../routes/history";

const MyStyle = {
    DialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    OTIDialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    ButtonDivStyle : {paddingTop: '10px', paddingBottom: "35px"},
    LoginButtonStyle : {marginRight: ".25em", float: "right"}    
}

class TaskMaintenanceDatatable extends Component {

    state = {
        data: [],
        selectedTask: null,
        menu: [
            {
                label: 'View Task', 
                icon: 'pi pi-fw pi-task', 
                command: (event) => this.viewTask(this.state.selectedTask)
            }            
        ]
    }

    async componentDidMount(){
        if(_.isEmpty(this.props.TASKS))
        {
            await this.props.getAllTasks();
        }        
    }

    viewTask(task) {
        let id = task.taskId;
        history.push(`/app/taskmaintenance/view/${id}`);
    }

    refreshTable = async (event) => {
        event.preventDefault(); 
        await this.props.getAllTasks();
    }

    hideContext = () => {
        this.setState({ selectedTask: null });
    }

    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>;
        }
        else {

            if (data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((task, i) => <li key={task.taskId}>{task.taskId + ' - ' + task.id + ' - ' + task.dateOpened + ' - ' + task.dateClosed }</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected Ticket: {data.taskId + ' - ' + data.id + ' - ' + data.dateOpened + ' - ' + data.dateClosed }</div>

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
                <UILoader blockui="TASK_LOADING" unblockui={["TASK_GET_ALL","TASK_ERROR"]}>
                <DataTable //style={{textAlign:'left'}}
                    value={this.props.TASKS}
                    scrollable={true}
                    selectionMode="single"
                    header="Tasks Maintenance Data"
                    footer={this.displaySelection(this.state.selectedTask)}
                    selection={this.state.selectedTask}                
                    onSelectionChange={e => this.setState({ selectedTask: e.value })}
                    paginator={true}
                    paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    contextMenuSelection={this.state.selectedTask} onContextMenuSelectionChange={e => this.setState({ selectedTask: e.value })}
                    onContextMenu={e => this.cm.show(e.originalEvent)}
                >

                    <Column field="id" header="ID" style={{ width: '150px' }} />
                    <Column field="taskId" header="Ticket ID" style={{ width: '150px' }} />
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
        TASKS: Object.values(state.TASKS.tasksResponse)       
    };
};

const mapDispatchToProps = {getAllTasks};

export default connect(mapStateToProps,mapDispatchToProps)(TaskMaintenanceDatatable);