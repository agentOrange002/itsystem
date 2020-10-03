import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {connect} from 'react-redux';
import {getAllIssues,ownedThisIssue} from '../../../redux/actions/IssuesActions';
import {ContextMenu} from 'primereact/contextmenu';
import {Dialog} from 'primereact/dialog';
import AssignedSupportDialog from './AssignedSupportDialog';
import _ from 'lodash';
import {Fieldset} from 'primereact/fieldset';
import history from "../../../routes/history";
import UILoader from '../tools/UILoader';
import {Messages} from "primereact/messages";

const MyStyle = {
    DialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    OTIDialogStyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
    ButtonDivStyle : {paddingTop: '10px', paddingBottom: "35px"},
    LoginButtonStyle : {marginRight: ".25em", float: "right"}    
}

class IssueMaintenanceDataTable extends Component {

    state = {
        data: [],
        selectedIssue: null,
        asVisible: false,
        otiVisible: false,
        dialogState: null,
        menu: [
            {
                label: 'View This Issue', 
                icon: 'pi pi-fw pi-user', 
                command: (event) => this.viewIssue(this.state.selectedIssue)
            },
            {
                label: 'Owned This Issue', 
                icon: 'pi pi-fw pi-user', 
                command: (event) => this.ownedThisIssue(this.state.selectedIssue)
            },
            {
                label: 'Assign Support', 
                icon: 'pi pi-fw pi-user', 
                command: (event) => this.assignSupport(this.state.selectedIssue)
            },
            {
                label: 'Open Ticket', 
                icon: 'pi pi-fw pi-plus', 
                command: (event) => this.ownedThisIssue(this.state.selectedIssue)
            },
            {
                label: 'Close Ticket', 
                icon: 'pi pi-fw pi-times', 
                command: (event) => this.ownedThisIssue(this.state.selectedIssue)
            }          
        ]
    }

    componentDidMount() {
        if(_.isEmpty(this.props.ISSUES)) {
            this.props.getAllIssues();
        }        
    }

    viewIssue(issue) {
        if(_.isEmpty(issue)) {
            this.pleaseselectissue();
        }
        else {
            history.push(`/app/issuemaintenance/view/${issue.issueId}`);
        }       
    }

    ownedThisIssue(issue) {
        if(_.isEmpty(issue)) {
            this.pleaseselectissue();
        }
        else {
            this.setState({otiVisible: true});       
            this.setState({dialogState: issue});       
        }       
    }

    assignSupport(issue) {
        if(_.isEmpty(issue)) {
            this.pleaseselectissue();
        }
        else {
            this.setState({asVisible: true});       
            this.setState({dialogState: issue});
        }        
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

    hideContext = () => {
        this.setState({selectedIssue: null});
    }

    refreshTable = async(event) => {
        event.preventDefault(); 
        await this.props.getAllIssues();
    }

    hideASDialog = () => {
        this.setState({asVisible: false});
    }

    hideOTIDialog = () => {        
        this.setState({otiVisible: false});
    }

    NoOOTIDialogButton = (event) => {
        event.preventDefault();
        this.setState({otiVisible: false});
    }

    YesOTIDialogButton = (event) => {
        event.preventDefault();      
        let IssueID;
        if(_.isEmpty(this.state.dialogState))
        {
            IssueID= null;
        }
        else{
            IssueID=this.state.dialogState.issueId;
            this.props.ownedThisIssue(IssueID,this.props.LoginUserID); 
        }      
    }

    footerDialog = () => {
        return (
            <div className='button' style={MyStyle.ButtonDivStyle}>
            <span>               
                <Button label='No' onClick={this.NoOOTIDialogButton} className="p-button-danger" icon='pi pi-times' style={MyStyle.LoginButtonStyle} />
                <Button label='Yes' onClick={this.YesOTIDialogButton} className="p-button-success" icon='pi pi-check' style={MyStyle.LoginButtonStyle} />
            </span>
        </div>
        );
    }

    pleaseselectissue = () => {
        this.messages.show({severity: 'error', summary: 'Error Message', detail: 'Please Select Issue First!'});
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh" onClick={this.refreshTable}/>;          
        return (            
            <UILoader blockui="ISSUES_LOADING" unblockui={["ISSUES_GET_ALL","ISSUES_ERROR"]}>   
            <Messages ref={(el) => this.messages = el}></Messages>    
            <div className="content-section implementation">             
                <ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <DataTable
                    value={this.props.ISSUES}
                    scrollable={true}
                    selectionMode="single"
                    header="Issues Maintenance Data"
                    footer={this.displaySelection(this.state.selectedIssue)}
                    selection={this.state.selectedIssue}
                    // onSelectionChange={e => this.setState({selectedIssue: e.value})}
                    onSelectionChange={e => {
                        this.setState({selectedIssue: e.value});
                        // this.props.issueChoose(e.value);
                    }}
                    paginator={true}
                    paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    contextMenuSelection={this.state.selectedIssue} onContextMenuSelectionChange={e => this.setState({selectedIssue: e.value})}
                    onContextMenu={e => this.cm.show(e.originalEvent)}
                >

                    <Column field="id" header="ID" style={{width: '100px'}} />
                    <Column field="issueStatus" header="Status" style={{width: '100px'}} />
                    <Column field="issueId" header="Issue ID" style={{width: '150px'}} />
                    <Column field="subject" header="Subject" style={{width: '250px'}} />
                    {/* <Column field="description" header="Description" style={{width:'550px'}} /> */}
                    <Column field="reportedBy" header="Reported By" style={{width: '250px'}} />
                    <Column field="emailProvided" header="E-mail" style={{width: '250px'}} />
                    <Column field="dateReported" header="Date Reported" style={{width: '250px'}} />
                </DataTable>
                <Dialog 
                    header="Assign Support Form" 
                    visible={this.state.asVisible} 
                    style={MyStyle.DialogStyle}
                    modal={true} 
                    onHide={this.hideASDialog}>                        
                   <AssignedSupportDialog onselectedIssue={this.state.dialogState} hidethis={this.hideASDialog}/>
                </Dialog>
                <Dialog 
                    header="Issue Owning " 
                    footer={this.footerDialog()}
                    visible={this.state.otiVisible} 
                    style={MyStyle.OTIDialogStyle}
                    modal={true} 
                    onHide={this.hideOTIDialog}> 
                    <Fieldset legend="Message">
                    <div className='p-grid p-fluid'>
                        <div className='p-col-12 p-md-12 p-lg-12'>
                            <h1>Are you sure?</h1>    
                        </div>      
                     </div>     
                    </Fieldset>
                                     
                </Dialog>
            </div>
            </UILoader>
        );
    }
}

const mapStateToProps = state => {
    return {
        ISSUES: Object.values(state.ISSUES.issuesResponse),
        LoginUserID: state.LOGIN_AUTHENTICATION.loginState.loginResponse.userid
    };
};

// const mapDispatchToProps = dispatch => ({
//     getAllIssues: () => dispatch(getAllIssues())
// });
const mapDispatchToProps = {getAllIssues,ownedThisIssue};

export default connect(mapStateToProps, mapDispatchToProps)(IssueMaintenanceDataTable);