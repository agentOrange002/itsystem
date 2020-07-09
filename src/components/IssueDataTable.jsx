import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

import {connect} from 'react-redux';
import {getAllIssues} from '../redux/actions/IssuesActions';
import {getIssueLogByIssueID} from "../redux/actions/IssueLogsActions";

import _ from 'lodash';

const MyStyle = {
    ButtonDiv : { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right" ,width:'100px'},
    id:{width:'100px'},
    issueStatus:{width:'100px'},
    issueId:{width:'150px'},
    subject:{width:'250px'},   
    reportedBy:{width:'250px'},
    emailProvided:{width:'250px'},
    dateReported:{width:'250px'}
};

class IssueDataTable extends Component {  

    state = {
        data: [],
        selectedIssue: null,
        globalFilter: null,
    }

    componentDidMount() {       
        if(_.isEmpty(this.props.ISSUES)) 
        {
            this.props.getAllIssues();
        }       
    }

    renderHeader = () => {
        return (
            <div>
                List of Issues
                <div  className="p-datatable-globalfilter-container">
                    <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" />
                </div>
            </div>
        );
    }

    onSelectID = (e) => {
        this.props.selectID(this.state.selectedIssue);  
        this.props.onVisible(false);
       // this.props.getIssueLogByIssueID(this.state.selectedIssue.issueId).then(()=>{this.props.onVisible(false)});  
    }

    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>;
        }
        else {
            if (data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((issue, i) => <li key={issue.issueId}>{issue.issueId + ' - ' + issue.id + ' - ' + issue.subject + ' - ' + issue.issueStatus+ ' - ' + issue.description}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected Issue: {data.issueId + ' - ' + data.id + ' - ' + data.subject + ' - ' + data.issueStatus+ ' - ' + data.description}</div>
        }
    }   

    render() {
        const header = this.renderHeader();
        const paginatorLeft = <Button icon="pi pi-refresh" />;       

        return (                     
                <div className="content-section implementation">                   
                   
                    <DataTable                      
                        value={this.props.ISSUES}                        
                        scrollable={true}
                        selectionMode="single"
                        header={header}
                        responsive
                        globalFilter={this.state.globalFilter}
                        footer={this.displaySelection(this.state.selectedIssue)}
                        selection={this.state.selectedIssue}
                        onSelectionChange={e => this.setState({selectedIssue: e.value})}
                        paginator={true}
                        paginatorLeft={paginatorLeft}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 20]} >
                     
                        <Column field="id" header="ID" style={MyStyle.id} />
                        <Column field="issueStatus" header="Status" style={MyStyle.issueStatus} />
                        <Column field="issueId" header="Issue ID" style={MyStyle.issueId}  />
                        <Column field="subject" header="Subject" style={MyStyle.subject} />
                        {/* <Column field="description" header="Description" style={{width:'550px'}} /> */}
                        <Column field="reportedBy" header="Reported By" style={MyStyle.reportedBy} />
                        <Column field="emailProvided" header="E-mail" style={MyStyle.emailProvided} />
                        <Column field="dateReported" header="Date Reported" style={MyStyle.dateReported} />
                    </DataTable>
                    <div className='button'
                            style={MyStyle.ButtonDiv}>
                            <span>
                            <Button
                                icon='pi pi-check'
                                label='Choose'
                                style={MyStyle.Button}
                                onClick={this.onSelectID}
                            />
                            </span>
                        </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      ISSUES: Object.values(state.ISSUES.issuesResponse)
    };
};

// const mapDispatchToProps = dispatch => ({
//     getAllIssues: () => dispatch(getAllIssues()),
//     getIssueLogByIssueID: (issueId) => dispatch(getIssueLogByIssueID(issueId))
// }); 

const mapDispatchToProps = {getAllIssues,getIssueLogByIssueID};

export default connect(mapStateToProps,mapDispatchToProps)(IssueDataTable);