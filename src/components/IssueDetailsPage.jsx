import React, { Component } from 'react';

import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Panel} from 'primereact/panel';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dialog} from 'primereact/dialog';

import history from "../routes/history";
import {connect} from 'react-redux';

// import {submitReportIssue} from "../redux/actions/reportissue";
// import {Field,reduxForm} from 'redux-form';

import _ from 'lodash';

import IssueDataTable from './IssueDataTable';
import IssueLogsDataView from './IssueLogsDataView';
import IssueLogMessage from './IssueLogMessage';

const MyStyle = {
    divPaddingTop: {paddingBottom:'.5em'},
    paddingTop: {paddingTop:'.5em'},
    divTopPx: { paddingTop: "20px" },
    width: { width: "100%" },
    tooltip: {position: 'top'},
   dialogstyle: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
}

class IssueDetailsPage extends Component {    
       state = {
            issueIDselected:null,
            IssueLogVisible:false,
            visible:false,
            userid: null,
            breadcrumdItems: [
                {label:'Issues'},
                {label:'Issue Details'},               
            ],
            home: {
                icon: 'pi pi-home', command: () => {history.push('/app/');}
            },
          
            tieredItems: [
                {
                    label:'Find Issue',
                    icon:'pi pi-fw pi-search',
                    command:() => {this.setState({visible:true}); }
                 },   
                 {
                    label:'Print',
                    icon:'pi pi-fw pi-print',
                    command: () => {console.log('Print Issue')}
                 }
            ]
           
        };    

    componentDidMount() {
        this.setState({userid:this.props.authlogin.loginState.loginResponse.userid });
    }

    addMessage = (event) => {
        event.preventDefault();
        this.setState({IssueLogVisible: true});
    }  

    render() {        
        return ( 
            <div className="p-grid p-fluid">               
                <div className="p-col-12" >
                    <div style={MyStyle.divPaddingTop}> 
                        <BreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
                    </div>  
                    <div>
                        <Menubar model={this.state.tieredItems} >                               
                            <Button label="Add Message" icon="pi pi-plus" onClick={this.addMessage}    
                              disabled={this.state.issueIDselected === null ? "disabled" : undefined} />
                        </Menubar >
                    </div>
                    <div style={MyStyle.paddingTop}>                  
                    <Panel header='Issue Details' toggleable={true}>
                        <Fieldset legend={_.isEmpty(this.state.issueIDselected)?`Issue Form`:`Selected Issue ID - ${this.state.issueIDselected.id}`}>
                            <div className='p-grid p-fluid'>   
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="id" 
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.id}`} 
                                        style={MyStyle.width} 
                                        tooltip='ID' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="id">ID</label>
                                    </span>            
                                </div> 
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="issueId" 
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.issueId}`} 
                                        style={MyStyle.width} 
                                        tooltip='Issue ID' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="issueId">Issue ID</label>
                                    </span>            
                                </div>                                      
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="reportedby" 
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.reportedBy}`} 
                                        style={MyStyle.width} 
                                        tooltip='Reported By' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="reportedby">Reported By</label>
                                    </span>            
                                </div>   
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="dateReported" 
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.dateReported}`} 
                                        style={MyStyle.width} 
                                        tooltip='Date Reported' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="dateReported">Date Reported</label>
                                    </span>            
                                </div>   
                                <div className='p-col-12 p-md-6 ' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="email"
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.emailProvided}`} 
                                        style={MyStyle.width} 
                                        tooltip='Email Address' 
                                        tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="email">Email Address</label>
                                    </span>            
                                </div> 
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="status"
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.issueStatus}`} 
                                        style={MyStyle.width} 
                                        tooltip='Issue Status' 
                                        tooltipOptions={MyStyle.tooltip}
                                        readOnly/>                                           
                                        <label htmlFor="status">Issue Status</label>
                                    </span>            
                                </div>
                                <div className='p-col-12 p-md-12' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="subject"
                                        value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.subject}`} 
                                        style={MyStyle.width} 
                                        tooltip='Issue Subject' 
                                        tooltipOptions={MyStyle.tooltip}
                                        readOnly/>                                           
                                        <label htmlFor="subject">Issue Subject</label>
                                    </span>            
                                </div>
                                <div className='p-col-12 p-md-12' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputTextarea id="desc"
                                            value={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.description}`} 
                                            style={MyStyle.width} 
                                            rows={5} cols={30}                       
                                            tooltip='Issue Description'        
                                            tooltipOptions={MyStyle.tooltip}                        
                                            readOnly/>
                                        <label htmlFor="desc">Issue Description</label>
                                    </span>   
                                </div>
                            </div>
                        </Fieldset>                     
                    </Panel >                   
                    <Dialog header="Find Issue ID" 
                        visible={this.state.visible}  
                        maximizable  
                        style={MyStyle.dialogstyle}
                        modal={true} 
                        onHide={() => this.setState({visible: false})}>
                        <IssueDataTable onVisible={(isvisible) => this.setState({visible:isvisible})} selectID={(idSelected)=>this.setState({issueIDselected:idSelected})} /> 
                    </Dialog>     
                    <Dialog header="New IssueLog Message"                        
                        visible={this.state.IssueLogVisible}  
                        maximizable  
                        style={MyStyle.dialogstyle}
                        modal={true} 
                        onHide={() => this.setState({IssueLogVisible: false})}>
                       <IssueLogMessage onVisible={(isvisible) => this.setState({IssueLogVisible:isvisible})} dataIssueId={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.issueId}`}/>
                    </Dialog>         
                    {/* <Button label="Show" icon="pi pi-info-circle" onClick={(e) => this.setState({visible: true})} /> */}
                    </div>    
                    <div style={MyStyle.paddingTop}>  
                    <Panel header='Issue Logs Message' toggleable={true}> 
                    <IssueLogsDataView dataIssueId={_.isEmpty(this.state.issueIDselected)?`NONE`:`${this.state.issueIDselected.issueId}`}  />
                    </Panel>
                    </div>         
            </div>   
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      authlogin: state.LOGIN_AUTHENTICATION
    };
};
 
export default connect(mapStateToProps,null)(IssueDetailsPage);