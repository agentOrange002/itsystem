import React, { Component } from 'react';

import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Panel} from 'primereact/panel';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dialog} from 'primereact/dialog';
import {Messages} from "primereact/messages";

import history from "../routes/history";
import {connect} from 'react-redux';

import {saveTicket,getAllTicketsByIssueId} from "../redux/actions/TicketActions";
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
   ticketdialogstyle: {width: '350px',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
}

class IssueDetailsPage extends Component {    
       state = {
            issueIDselected:null,
            IssueLogVisible:false,
            TicketVisible: false,
            ticketinfo:null,
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
                    command: () => {this.printIssue();}
                 },
                 {
                    label:'Create Ticket',
                    icon:'pi pi-fw pi-plus',
                    command: () => {this.createTicket();}
                 },

            ]
           
        };    

    componentDidMount() {
        this.setState({userid:this.props.authlogin.loginState.loginResponse.userid });      
    }
    
    async componentDidUpdate(prevProps,prevState){
        if(this.state.issueIDselected !== prevState.issueIDselected)  {           
           await this.props.getAllTicketsByIssueId(this.state.issueIDselected.issueId);           
            this.lastArrayTicket();    
            
            if(_.isEmpty(this.state.ticketinfo)){               
                console.log("this issue has no ticket");
                 this.noticket();
             }
        }

        // if(this.state.ticketinfo !== prevState.ticketinfo) {    
        //       if(!_.isEmpty(this.state.ticketinfodateOpened)&&_.isEmpty(!this.state.ticketinfo.dateClosed)) {
        //           this.noticket();
        //        }
        // }       
    }

    

    welcome = () => {
        this.messages.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
    }

    noticket = () => {
        this.messages.show({severity: 'error', summary: 'No Ticket Found', detail: 'No ticket opened for this issue', sticky:true});      
    }

    pleaseselectissue = () => {
        this.messages.show({severity: 'error', summary: 'Error Message', detail: 'Please Select Issue First!'});
    }

    lastArrayTicket = () =>  {      
        let ticketdetails = this.props.tickets;    
       this.setState({ticketinfo: ticketdetails.pop()});     
        // return ticketdetails.pop();
    }

    addMessage = (event) => {
        event.preventDefault();
        this.setState({IssueLogVisible: true});
    }  

    createTicket = () => {     
        if(_.isEmpty(this.state.issueIDselected)) {
            this.pleaseselectissue();
        } 
        else{
            this.setState({TicketVisible: true});
        }        
    }

    printIssue = () => {
        if(_.isEmpty(this.state.issueIDselected)) {
            this.pleaseselectissue();
        } 
        else{
          
        }        
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onSave(name)} autoFocus />
            </div>
        );
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    
    onSave(name) {
        this.props.saveTicket(this.state.issueIDselected.issueId).then(this.setState({[`${name}`]: false }));      
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
                    <Messages ref={(el) => this.messages = el}></Messages>          
                    <Panel header='Issue Details' toggleable={true}>
                        <Fieldset legend={_.isEmpty(this.state.issueIDselected)?`Issue Info`:`Selected Issue ID - ${this.state.issueIDselected.id}`}>
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
                        <Fieldset legend="Ticket Info">
                            <div className='p-grid p-fluid'>   
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="tid" 
                                        value={_.isEmpty(this.state.ticketinfo) ? `NONE` : `${this.state.ticketinfo.ticketId}`} 
                                        style={MyStyle.width} 
                                        tooltip='Ticket ID' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="tid">Ticket ID</label>
                                    </span>            
                                </div> 
                                <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                    <span className="p-float-label">
                                        <InputText id="tstatus" 
                                        value={_.isEmpty(this.state.ticketinfo) ? `NONE`:`${_.isEmpty(this.state.ticketinfo.dateClosed) ? `OPEN`: `CLOSED`}`} 
                                        style={MyStyle.width} 
                                        tooltip='Ticket Status' tooltipOptions={MyStyle.tooltip}
                                        readOnly/>
                                        <label htmlFor="tstatus">Ticket Status</label>
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
                    <Dialog header="Create Ticket Message"                        
                        visible={this.state.TicketVisible}                         
                        modal style={MyStyle.ticketdialogstyle}
                        footer={this.renderFooter('TicketVisible')}                         
                        onHide={() => this.onHide('TicketVisible')}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            <span>Are you sure you want to create a ticket for this issue?</span>
                        </div>
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
      authlogin: state.LOGIN_AUTHENTICATION,
      tickets: Object.values(state.TICKETS.ticketResponse)
    };
};

const mapDispatchProps = {saveTicket,getAllTicketsByIssueId}
 
export default connect(mapStateToProps,mapDispatchProps)(IssueDetailsPage);