import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { DataTable } from 'primereact/datatable';
import { ContextMenu } from 'primereact/contextmenu';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Field, reduxForm } from 'redux-form';
import { getAllTasksByTicketId, saveTask } from '../../../redux/actions/TaskActions';
import { maxLength150, minLength10 } from '../../messages/errorFieldNotification';

const MyStyle = {
    DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    OTIDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    ButtonDivStyle: { paddingTop: '10px' },
    ButtonStyle: { marginRight: ".25em", float: "right" },
    h1Style: { textAlign: "left" },
    paddingTop: { paddingTop: '0px' },
    ShortDialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    columnId:{ width: '150px' },
    columnTaskId:{width: '150px' },
    columnDO:{width: '200px' },
    columnDC:{width: '200px' },
    fieldDivButton:{ paddingTop: "10px", paddingBottom: "35px" },
    fieldButton: { marginRight: ".25em", float: "right", width: '130px' },
    divform: {paddingTop: "20px"},
    divfield: { width: "100%" },
    tooltipField: { position: 'top' },
    fieldset: {marginBottom: '10px'}
}

class TicketInfo extends Component {
    state = {
        selectedTask: null,
        TaskVisible: false,
        dialogState: null,
        menu: [
            {
                label: 'View Task',
                icon: 'pi pi-fw pi-task',
                command: (event) => this.viewTicket(this.state.selectedTask)
            }
        ]
    }

    hideContext = () => {
        this.setState({ selectedTask: null });
    }

    refreshTable = async (event) => {
        event.preventDefault();
        const { ticketid } = this.props.match.params;
        await this.props.getAllTasksByTicketId(ticketid);
    }

    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{ textAlign: 'left' }}>No Selection</div>;
        }
        else {

            if (data instanceof Array)
                return <ul style={{ textAlign: 'left', margin: 0 }}>{data.map((task, i) => <li key={task.taskId}>{task.taskId + ' - ' + task.id + ' - ' + task.dateOpened + ' - ' + task.dateClosed}</li>)}</ul>;
            else
                return <div style={{ textAlign: 'left' }}>
                    Selected Ticket: {data.taskId + ' - ' + data.id + ' - ' + data.dateOpened + ' - ' + data.dateClosed}
                </div>
        }
    }

    async componentDidMount() {
        const { ticketid } = this.props.match.params;
        await this.props.getAllTasksByTicketId(ticketid);
    }

    header = () => {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-6" >
                    <h1 style={MyStyle.h1Style}>Task List</h1>
                </div>
                <div className="p-col-12 p-md-6" >
                    {/* <div style={MyStyle.ButtonStyle}>
                        <Button label='No' ></Button> 
                    </div>       */}
                    <div style={MyStyle.ButtonStyle}>
                        <Button label='Add New Task' icon='pi pi-plus-circle' onClick={this.addTask} />
                    </div>
                </div>
            </div>
        );
    }

    addTask = (event) => {
        event.preventDefault();
        this.setState({ TaskVisible: true });
    }

    hideDialog = () => {
        this.setState({ TaskVisible: false });
    }

    onSubmit = async (formValues) => {
        const { ticketid } = this.props.match.params;
        await this.props.saveTask(formValues, ticketid);
        this.setState({
            TaskVisible: false
        });
    }

    renderInput({ input, label, meta: { touched, error, warning } }) {
        return (
            <div className='p-col-12 p-md-12' style={MyStyle.divform}>
                <span className="p-float-label">
                    <InputText 
                    {...input} 
                    className={error ? `p-error` : undefined} 
                    id="in" style={MyStyle.divfield} tooltip={label} tooltipOptions={MyStyle.tooltipField} />
                    <label htmlFor="in">{label}</label>
                </span>
                {touched && ((error &&
                    <span>
                        <div className="isa_error">
                            <i className="pi pi-times"></i>
                            {error}
                        </div>
                    </span>
                ) || (warning &&
                    <span>
                        <div className="isa_warning">
                            <i className="pi pi-question"></i>
                            {warning}
                        </div>
                    </span>
                    ))}
            </div>
        )
    }

    renderTextArea({ input, label, meta: { touched, error, warning } }) {
        return (
            <div className='p-col-12 p-md-12' style={MyStyle.divform}>
                <span className="p-float-label">
                    <InputTextarea
                        {...input}
                        className={error ? `p-error` : undefined}
                        style={MyStyle.divfield}
                        rows={5} cols={30}
                        tooltip={label}
                        tooltipOptions={MyStyle.tooltipField}
                    />
                    <label htmlFor="in">{label}</label>
                </span>
                {touched && ((error &&
                    <span>
                        <div className="isa_error">
                            <i className="pi pi-times"></i>
                            {error}
                        </div>
                    </span>
                ) || (warning &&
                    <span>
                        <div className="isa_warning">
                            <i className="pi pi-question"></i>
                            {warning}
                        </div>
                    </span>
                    ))}
            </div>
        )
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh" onClick={this.refreshTable} />;
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <Panel header="Ticket Information" toggleable={true}>
                        <Fieldset legend='Ticket' style={MyStyle.fieldset}>
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
                        <Fieldset legend='Issue' >
                            <div className="p-fluid p-formgrid p-grid" >
                                <div className="p-field p-col-12 p-md-6 p-lg-3" >
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
                <div className="p-col-12" style={MyStyle.paddingTop}>
                    <ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                    <DataTable
                        value={this.props.TASKS}
                        scrollable={true}
                        selectionMode="single"
                        header={this.header()}
                        footer={this.displaySelection(this.state.selectedTicket)}
                        selection={this.state.selectedTicket}
                        onSelectionChange={e => { this.setState({ selectedTask: e.value }); }}
                        paginator={true}
                        paginatorLeft={paginatorLeft}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        contextMenuSelection={this.state.selectedTicket} onContextMenuSelectionChange={e => this.setState({ selectedTicket: e.value })}
                        onContextMenu={e => this.cm.show(e.originalEvent)}
                    >

                        <Column field="id" header="ID" style={{width:'150px'}} />
                        <Column field="taskId" header="Task ID" style={{width:'250px'}} />
                        <Column field="subject" header="Subject" style={{width:'350px'}} />
                        <Column field="description" header="Description" style={{width:'650px'}} />
                        <Column field="dateOpened" header="Date Opened" style={{width:'250px'}} />
                        <Column field="dateClosed" header="Date Closed" style={{width:'250px'}} />
                    </DataTable>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Dialog
                            header="Add New Task"
                            visible={this.state.TaskVisible}
                            style={MyStyle.ShortDialogStyle}
                            modal={true}
                            onHide={this.hideDialog}>
                            <Fieldset legend="Task Form">
                                <div className='p-grid p-fluid'>
                                    <Field name="subject" label="Task Subject" component={this.renderInput} validate={minLength10} />
                                    <Field name="description" label="Task Description" component={this.renderTextArea} validate={[minLength10, maxLength150]} />
                                </div>
                            </Fieldset>
                            <div className='button'
                                style={MyStyle.fieldDivButton}>
                                <span>
                                    <Button
                                        icon='pi pi-plus'
                                        label='Add Task'
                                        style={MyStyle.fieldButton}
                                    />
                                </span>
                            </div>
                        </Dialog>
                    </form>
                </div>
            </div>
        );
    }
}

const TaskForm = reduxForm({
    form: 'addNewTask'
})(TicketInfo);

const mapStateToProps = (state, ownProps) => {
    const { ticketid } = ownProps.match.params;
    return {
        TICKET: state.TICKETS.ticketsResponse[ticketid],
        TASKS: Object.values(state.TASKS.tasksResponse)
    };
};

const mapDispatchToProps = { getAllTasksByTicketId, saveTask };

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);