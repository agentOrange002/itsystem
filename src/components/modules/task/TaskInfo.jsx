import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const MyStyle = {
    ButtonDivStyle: { paddingTop: '10px', paddingBottom: "35px" },
    loginButton: { float: "right" },
    DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    LoginButtonStyle: { marginRight: ".25em", float: "right" },
    DialogText: { textAlign: 'center' }
}

class TaskInfo extends Component {
    state = {
        taskdata: {},
        updateVisible: false,
    }
    async componentDidMount() {
        await this.setState({ taskdata: this.props.TASK });
    }

    updateTask = (event) => {
        event.preventDefault();
        this.setState({ updateVisible: true });
    }

    hideUpdateDialog = () => {
        this.setState({ updateVisible: false });
    }

    NoDialogButton = (event) => {
        event.preventDefault();
        this.setState({ updateVisible: false });
    }

    YesDialogButton = (event) => {
        event.preventDefault();
        // let IssueID;
        // if(_.isEmpty(this.state.dialogState))
        // {
        //     IssueID= null;
        // }
        // else{
        //     IssueID=this.state.dialogState.issueId;
        //     this.props.ownedThisIssue(IssueID,this.props.LoginUserID); 
        // }      
    }

    footerDialog = () => {
        return (
            <div className='button' style={MyStyle.ButtonDivStyle} >
                <div style={MyStyle.loginButton}>
                    <Button label='Yes' onClick={this.YesDialogButton} className="p-button-success" icon='pi pi-check' />
                    <Button label='No' onClick={this.NoDialogButton} className="p-button-danger" icon='pi pi-times' />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <Panel header="Task Information">
                        <Fieldset legend='Task'>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="id">ID</label>
                                    <InputText id="id" type="text" defaultValue={this.props.TASK.id} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="taskid">Task ID</label>
                                    <InputText id="taskid" type="text" defaultValue={this.props.TASK.taskId} readOnly />
                                </div>
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateopened">Date Opened</label>
                                    <InputText id="dateopened" type="text" defaultValue={this.props.TASK.dateOpened} readOnly />
                                </div>
                                {/* //onChange={(e) => this.setState({ profile: { ...this.state.profile, userId: e.target.value } })} */}
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateclosed">Date Closed</label>
                                    <InputText id="dateclosed" type="text" defaultValue={_.isEmpty(this.props.TASK.dateClosed) ? 'NONE' : this.props.TASK.dateClosed} readOnly />
                                </div>

                                <div className="p-field p-col-12 p-md-6 p-lg-6">
                                    <label htmlFor="subject">Subject</label>
                                    <InputText id="subject" type="text" defaultValue={this.state.taskdata.subject} onChange={(e) => this.setState({ taskdata: { ...this.state.taskdata, subject: e.target.value } })} />
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea id="description" rows={3} cols={30} autoResize={true}
                                        defaultValue={this.state.taskdata.description}
                                        onChange={(e) => this.setState({ taskdata: { ...this.state.taskdata, description: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </Fieldset>
                        <div className='button' style={MyStyle.ButtonDivStyle}>
                            <div style={MyStyle.loginButton}>
                                <motion.div
                                    whileHover={{
                                        scale: 1.1,
                                        textShadow: "0px 0px 8px rgb(255,255,255)",
                                        boxShadow: "0px 0px 8px rgb(255,255,255)"
                                    }}>
                                    <Button label='Update' icon='pi pi-save' onClick={this.updateTask} />
                                </motion.div>
                            </div>
                        </div>

                    </Panel>
                    <Dialog
                        header="Update Task "
                        footer={this.footerDialog()}
                        visible={this.state.updateVisible}
                        style={MyStyle.DialogStyle}
                        modal={true}
                        onHide={this.hideUpdateDialog}>
                        <Fieldset legend="Message">
                            <div className='p-grid p-fluid'>
                                <div className='p-col-12 p-md-12 p-lg-12' style={MyStyle.DialogText}>
                                    <h1>Are you really want to update this task?</h1>
                                </div>
                            </div>
                        </Fieldset>
                    </Dialog>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { taskid } = ownProps.match.params;
    return {
        TASK: state.TASKS.tasksResponse[taskid]
    };
};

export default connect(mapStateToProps, null)(TaskInfo);