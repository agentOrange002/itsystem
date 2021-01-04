import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { getMDIssueLogByIssueID } from '../../../redux/actions/IssueLogsActions';
import {Fieldset} from 'primereact/fieldset';
// data: [
//   {
//        issueLogId: 'TESTid',
//        issueMessage: 'TEST MESSAGE',
//        logDate: '2020-12-12',
//   },
// ]

import ProfilePic from '../../../../public/assets/layout/images/profile.png';

const MyStyle = {
     padding: {padding: '.5em'},
     textAlign: {textAlign: 'center'},
     DivStyle: {fontSize: '16px', textAlign: 'center', padding: '20px'},
     left:{textAlign: 'left'},
     right:{textAlign: 'right'},
     dialog: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
     shortdialogstyle: { width: '20vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    
} 

class IssueLogsPage extends Component {
     state = {
          data:[],
          selectedIssueLog: null,
          products: null,
          editDialog: false,
          deleteDialog: false,
          issuelog: null,
          selectedProducts: null,
          submitted: false,
          globalFilter: null,
     };

     async componentDidMount() {
          const { issueid } = this.props.match.params;
          await this.props.getMDIssueLogByIssueID(issueid);
     }

     refreshTable = async (event) => {
          event.preventDefault();
          const { issueid } = this.props.match.params;
          await this.props.getMDIssueLogByIssueID(issueid);
     };

     hideEditDialog = () =>{
          this.setState({editDialog: false});
     }

     hideDeleteDialog = () =>{
          this.setState({deleteDialog: false});
     }
  
     displaySelection(data) {
          if (!data || data.length === 0) {
               return <div style={{ textAlign: 'left' }}>No Selection</div>;
          } else {
               if (data instanceof Array)
                    return (
                         <ul style={{ textAlign: 'left', margin: 0 }}>
                              {data.map((issuelog, i) => (
                                   <li key={issuelog.issueLogId}>
                                        {issuelog.issueLogId +
                                             ' - ' +
                                             issuelog.issueMessage +
                                             ' - ' +
                                             issuelog.logDate}
                                   </li>
                              ))}
                         </ul>
                    );
               else
                    return (
                         <div style={{ textAlign: 'left' }}>
                              Selected IssueLog:{' '}
                              {data.issueLogId +
                                   ' - ' +
                                   data.issueMessage +
                                   ' - ' +
                                   data.logDate}
                         </div>
                    );
          }
     }

     editLog = () => {         
          this.setState({               
               editDialog: true,
          });
     }

     deleteLog = () => {          
          this.setState({              
               deleteDialog: true,
          });
     }

     actionBodyTemplate = () => {
          return (
               <React.Fragment>
                    <Button
                         icon='pi pi-pencil'
                         className='p-button-rounded p-button-success p-mr-2'
                         onClick={this.editLog}
                    />
                    <Button
                         icon='pi pi-trash'
                         className='p-button-rounded p-button-warning'
                         onClick={this.deleteLog}
                    />
               </React.Fragment>
          );
     }

     renderEditDialog = (issuelog) =>  {    
         if(!_.isEmpty(issuelog)) {
          return (
               <div>
               <Fieldset legend='Edit Form'>
               <div className="p-grid" style={MyStyle.DivStyle}>    
                    <div className="p-col-12" style={MyStyle.textAlign}>
                         <img src={ProfilePic} alt={this.state.selectedIssueLog.issueLogId} />
                    </div>                  
  
                    <div className="p-col-4">IssueLogID: </div>
                    <div className="p-col-8">{issuelog.issueLogId}</div>

                    <div className="p-col-4">LogDate: </div>
                    <div className="p-col-8">{issuelog.logDate}</div>

                    <div className="p-col-4">Message: </div>
                    <div className="p-col-8">{issuelog.issueMessage}</div>                      
                    </div>
               </Fieldset>
               </div> 
              );     
         }      
      }
      
      footerDialog = () => {
          return (
              <div className='button' style={MyStyle.ButtonDivStyle}>
                  <span>
                      <Button label='No' onClick={this.hideDeleteDialog} className="p-button-danger" icon='pi pi-times' style={MyStyle.LoginButtonStyle} />
                      <Button label='Yes' onClick={this.hideDeleteDialog} className="p-button-success" icon='pi pi-check' style={MyStyle.LoginButtonStyle} />
                  </span>
              </div>
          );
      }

     render() {
          const paginatorLeft = (
               <Button icon='pi pi-refresh' onClick={this.refreshTable} />
          );
          return (
               <>
                    <div className='p-grid p-fluid'>
                         <div className='p-col-12'>
                              <div className='content-section implementation'>
                                   <DataTable
                                        value={this.props.MDISSUELOGS}
                                        scrollable={true}
                                        selectionMode='single'
                                        header='My Issue Logs'
                                        footer={this.displaySelection(
                                             this.state.selectedIssueLog
                                        )}
                                        selection={this.state.selectedIssueLog}
                                        onSelectionChange={(e) =>
                                             this.setState({
                                                  selectedIssueLog: e.value,
                                             })
                                        }
                                        paginator={true}
                                        paginatorLeft={paginatorLeft}
                                        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                                        currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                                        rows={10}
                                        rowsPerPageOptions={[5, 10, 20]}>
                                        <Column
                                             body={this.actionBodyTemplate}
                                             header='Actions'
                                             style={{ width: '120px' }}
                                        />
                                        <Column
                                             field='issueLogId'
                                             header='IssueLog ID'
                                             style={{ width: '180px' }}
                                        />
                                        <Column
                                             field='issueMessage'
                                             header='Log Message'
                                             style={{ width: '700px' }}
                                        />
                                        <Column
                                             field='logDate'
                                             header='Log Date'
                                             style={{ width: '250px' }}
                                        />
                                        <Column
                                             field='issueLogUserDetails.userId'
                                             header='LogBy ID'
                                             style={{ width: '200px' }}
                                        />
                                        <Column
                                             field='issueLogUserDetails.fullName'
                                             header='LogBy'
                                             style={{ width: '300px' }}
                                        />
                                   </DataTable>
                                   <Dialog
                                        header='Edit Issue Log Details'
                                        visible={this.state.editDialog}
                                        style={MyStyle.dialog}
                                        modal={true}
                                        onHide={this.hideEditDialog}>
                                        {this.renderEditDialog(this.state.selectedIssueLog)}
                                   </Dialog>
                                   <Dialog header="Delete Issue Log Details"
                                        visible={this.state.deleteDialog}
                                        footer={this.footerDialog()}
                                        style={MyStyle.shortdialogstyle}
                                        modal={true}
                                        onHide={this.hideDeleteDialog}>
                                        <Fieldset legend="Message">
                                             <div className='p-grid p-fluid'>
                                                  <div className='p-col-12 p-md-12 p-lg-12'>
                                                       <h1>Are you sure?</h1>
                                                  </div>
                                             </div>
                                        </Fieldset>
                                   </Dialog>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state, ownProps) => {
  const { issueid } = ownProps.match.params;
  return {
    MYDOCUMENTS: state.MYDOCUMENTS.mydocumentResponse[issueid],
    MDISSUELOGS: Object.values(state.MDISSUELOGS.mdIssueLogsResponse),
  };
};

const mapDispatchToProps = { getMDIssueLogByIssueID };

export default connect(mapStateToProps, mapDispatchToProps)(IssueLogsPage);
