import React, { Component } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Menubar } from 'primereact/menubar';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Messages } from "primereact/messages";
import { TabView, TabPanel } from 'primereact/tabview';
import history from "../../../routes/history";
import { connect } from 'react-redux';
import { saveTicket, getAllTicketsByIssueId } from "../../../redux/actions/TicketActions";
// import {Field,reduxForm} from 'redux-form';
import _ from 'lodash';
import IssueDataTable from './IssueDataTable';
import IssueLogsDataView from './IssueLogsDataView';
import IssueLogMessage from './IssueLogMessage';
//import { ISSUELOGS_GET_BY_ISSUEID } from '../../../redux/constants/IssueLogsConstants';

const MyStyle = {
    divPaddingTop: { paddingBottom: '.5em' },
    paddingTop: { paddingTop: '.5em' },
    divTopPx: { paddingTop: "20px" },
    width: { width: "100%" },
    tooltip: { position: 'top' },
    dialogstyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    shortdialogstyle: { width: '20vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    ticketdialogstyle: { width: '350px', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
    menubar:{background: '#191919',height:'50px'},
    breadcrumbBG:{     
        borderStyle: 'solid',
        backgroundColor:'#000066',
        color:'#000066'
    },
    breadcrumb:{
        background:'#000066',
        borderColor:'#000066'    
    }
}

class IssueDetailsPage extends Component {
    state = {
        issueIDselected: null,
        IssueLogVisible: false,
        TicketVisible: false,
        ticketinfo: null,
        visible: false,
        userid: null,
        breadcrumdItems: [
            { label: 'Issues' },
            { label: 'Issue Details' },
        ],
        home: {
            icon: 'pi pi-home', command: () => { history.push('/app/'); }
        },

        tieredItems: [
            {
                label: 'Find Issue',
                icon: 'pi pi-fw pi-search',
                command: () => this.setState({ visible: true })
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print',
                command: () => { this.printIssue(); }
            },
            {
                label: 'Create Ticket',
                icon: 'pi pi-fw pi-plus',
                command: (event) => this.createTicket()
            },

        ]

    };

    componentDidMount() {
        this.setState({ userid: this.props.authlogin.loginState.loginResponse.userid });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.issueIDselected !== prevState.issueIDselected) {
            await this.props.getAllTicketsByIssueId(this.state.issueIDselected.issueId);
            this.lastArrayTicket();

            if (_.isEmpty(this.state.ticketinfo)) {
                console.log("this issue has no ticket");
                this.noticket();
            }
        }      
    }



    welcome = () => {
        this.messages.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    }

    noticket = () => {
        this.messages.show({ severity: 'error', summary: 'No Ticket Found', detail: 'No ticket opened for this issue', sticky: true });
    }

    pleaseselectissue = () => {
        this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Please Select Issue First!' });
    }

    lastArrayTicket = () => {
        let ticketdetails = this.props.tickets;
        this.setState({ ticketinfo: ticketdetails.pop() });       
    }

    checkLastTicketClosed = () => {
        let result = false;
        if (!_.isEmpty(this.state.ticketinfo)) {
            if (_.isEmpty(this.state.ticketinfo.dateClosed)) {
                result = true;
            }           
        }
        console.log("checkLastTicketClosed :"+result);
        return result;
    }

    addMessage = (event) => {
        event.preventDefault();
        this.setState({ IssueLogVisible: true });
    }

    createTicket() {
        if (_.isEmpty(this.state.issueIDselected)) {
            this.pleaseselectissue();
        }
        else {
            if (_.isEmpty(this.state.ticketinfo)) {
                this.setState({ TicketVisible: true });
            }
            else {
                if (this.checkLastTicketClosed()) {
                    this.messages.show({ severity: 'error', summary: 'Creating Ticket Error', detail: 'This issue has an opened ticket. Please review. ', sticky: true });
                }
                else {
                    this.messages.show({ severity: 'warn', summary: 'System Warning', detail: 'This issue has no ticket. Please create. ' });
                }
            }
        }
    }

    printIssue = () => {
        if (_.isEmpty(this.state.issueIDselected)) {
            this.pleaseselectissue();
        }
        else {

        }
    }

    footerDialog = () => {
        return (
            <div className='button' style={MyStyle.ButtonDivStyle}>
                <span>
                    <Button label='No' onClick={this.onHide} className="p-button-danger" icon='pi pi-times' style={MyStyle.LoginButtonStyle} />
                    <Button label='Yes' onClick={this.onSave} className="p-button-success" icon='pi pi-check' style={MyStyle.LoginButtonStyle} />
                </span>
            </div>
        );
    }

    onHide = () => {
        this.setState({
            TicketVisible: false
        });
    }

    onSave = async (event) => {
        event.preventDefault();
        let id = null;
        if (!_.isEmpty(this.state.issueIDselected)) {
            id = this.state.issueIDselected.issueId;
            await this.props.saveTicket(id);
            this.setState({
                TicketVisible: false
            });
        }

    }

    render() {
        return (
            <>   
            <div style={MyStyle.breadcrumbBG}>
                <BreadCrumb style={MyStyle.breadcrumb} model={this.state.breadcrumdItems} home={this.state.home} />
            </div>
            <div className='layout-main-inside'>
            <div className="p-grid p-fluid">
                <div className="p-col-12" >       
                <Menubar style={MyStyle.menubar} 
                            model={this.state.tieredItems} 
                            //  start={<InputText placeholder="Search" type="text"/>}
                            end={<Button label="Add Message" icon="pi pi-plus" onClick={this.addMessage} disabled={this.state.issueIDselected === null ? true : false} /> }
                        />
                    
                    <div style={MyStyle.paddingTop}>
                        <Messages ref={(el) => this.messages = el}></Messages>
                        <Panel header='Issue Details' toggleable={true}>
                            <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                                <TabPanel header="Information">
                                    <Fieldset legend={_.isEmpty(this.state.issueIDselected) ? `Issue` : `Selected Issue ID - ${this.state.issueIDselected.id}`}>
                                        <div className='p-grid p-fluid'>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="id"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.id}`}
                                                        style={MyStyle.width}
                                                        tooltip='ID' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="id">ID</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="issueId"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.issueId}`}
                                                        style={MyStyle.width}
                                                        tooltip='Issue ID' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="issueId">Issue ID</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="reportedby"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.reportedBy}`}
                                                        style={MyStyle.width}
                                                        tooltip='Reported By' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="reportedby">Reported By</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="dateReported"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.dateReported}`}
                                                        style={MyStyle.width}
                                                        tooltip='Date Reported' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="dateReported">Date Reported</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6 ' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="email"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.emailProvided}`}
                                                        style={MyStyle.width}
                                                        tooltip='Email Address'
                                                        tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="email">Email Address</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="status"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.issueStatus}`}
                                                        style={MyStyle.width}
                                                        tooltip='Issue Status'
                                                        tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="status">Issue Status</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-12' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="subject"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.subject}`}
                                                        style={MyStyle.width}
                                                        tooltip='Issue Subject'
                                                        tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="subject">Issue Subject</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-12' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputTextarea id="desc"
                                                        value={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.description}`}
                                                        style={MyStyle.width}
                                                        rows={5} cols={30}
                                                        tooltip='Issue Description'
                                                        tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="desc">Issue Description</label>
                                                </span>
                                            </div>
                                        </div>
                                    </Fieldset>
                                </TabPanel>
                                <TabPanel header="Ticket" disabled={_.isEmpty(this.state.issueIDselected) ? true : false} >
                                    <Fieldset legend="Ticket">
                                        <div className='p-grid p-fluid'>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="tid"
                                                        value={_.isEmpty(this.state.ticketinfo) ? `NONE` : `${this.state.ticketinfo.ticketId}`}
                                                        style={MyStyle.width}
                                                        tooltip='Ticket ID' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="tid">Ticket ID</label>
                                                </span>
                                            </div>
                                            <div className='p-col-12 p-md-6' style={MyStyle.divTopPx}>
                                                <span className="p-float-label">
                                                    <InputText id="tstatus"
                                                        value={_.isEmpty(this.state.ticketinfo) ? `NONE` : `${_.isEmpty(this.state.ticketinfo.dateClosed) ? `OPEN` : `CLOSED`}`}
                                                        style={MyStyle.width}
                                                        tooltip='Ticket Status' tooltipOptions={MyStyle.tooltip}
                                                        readOnly />
                                                    <label htmlFor="tstatus">Ticket Status</label>
                                                </span>
                                            </div>
                                        </div>
                                    </Fieldset>
                                </TabPanel>
                                <TabPanel header="Task" disabled={_.isEmpty(this.state.issueIDselected) ? true : false}>
                                    <Fieldset legend="Task" >

                                    </Fieldset>
                                </TabPanel>
                            </TabView>


                        </Panel >
                        <Dialog header="Find Issue ID"
                            visible={this.state.visible}
                            maximizable
                            style={MyStyle.dialogstyle}
                            modal={true}
                            onHide={() => this.setState({ visible: false })}>
                            <IssueDataTable onVisible={(isvisible) => this.setState({ visible: isvisible })} selectID={(idSelected) => this.setState({ issueIDselected: idSelected })} />
                        </Dialog>
                        <Dialog header="New IssueLog Message"
                            visible={this.state.IssueLogVisible}
                            maximizable
                            style={MyStyle.dialogstyle}
                            modal={true}
                            onHide={() => this.setState({ IssueLogVisible: false })}>
                            <IssueLogMessage onVisible={(isvisible) => this.setState({ IssueLogVisible: isvisible })} dataIssueId={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.issueId}`} />
                        </Dialog>
                        <Dialog header="Create Ticket Message"
                            visible={this.state.TicketVisible}
                            footer={this.footerDialog()}
                            style={MyStyle.shortdialogstyle}
                            modal={true}
                            onHide={this.onHide}>
                            <Fieldset legend="Message">
                                <div className='p-grid p-fluid'>
                                    <div className='p-col-12 p-md-12 p-lg-12'>
                                        <h1>Are you sure?</h1>
                                    </div>
                                </div>
                            </Fieldset>
                        </Dialog>
                        {/* <Button label="Show" icon="pi pi-info-circle" onClick={(e) => this.setState({visible: true})} /> */}
                    </div>
                    <div style={MyStyle.paddingTop}>
                        <Panel header='Issue Logs Message' toggleable={true}>
                            <IssueLogsDataView dataIssueId={_.isEmpty(this.state.issueIDselected) ? `NONE` : `${this.state.issueIDselected.issueId}`} />
                        </Panel>
                    </div>
                </div>
            </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authlogin: state.LOGIN_AUTHENTICATION,
        tickets: Object.values(state.TICKETS.ticketsResponse)
    };
};

const mapDispatchProps = { saveTicket, getAllTicketsByIssueId }

export default connect(mapStateToProps, mapDispatchProps)(IssueDetailsPage);