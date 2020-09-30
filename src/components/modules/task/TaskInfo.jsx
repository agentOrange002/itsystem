import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';

class TaskInfo extends Component {
    state = { } 
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
                                <div className="p-field p-col-12 p-md-6 p-lg-3">
                                    <label htmlFor="dateclosed">Date Closed</label>
                                    <InputText id="dateclosed" type="text" defaultValue={_.isEmpty(this.props.TASK.dateClosed) ? 'NONE' : this.props.TASK.dateClosed} readOnly />
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
    const { taskid } = ownProps.match.params;
    return {
        TASK: state.TASKS.ticketsResponse[taskid]
    };
};

export default connect(mapStateToProps, null)(TaskInfo);