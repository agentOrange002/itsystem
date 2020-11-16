import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {connect} from 'react-redux';
import {getIssueLogByIssueID} from '../../../redux/actions/IssueLogsActions';

const MyStyle = {
    padding: {padding: '.5em'},
    textAlign: {textAlign: 'center'},
    DivStyle: {fontSize: '16px', textAlign: 'center', padding: '20px'},
    left:{textAlign: 'left'},
    right:{textAlign: 'right'},
    dialog: {width: '50vw',borderStyle:'solid',borderColor:'white',borderWidth:'1px'},
}

class IssueLogsDataView extends Component {

    constructor() {
        super();
        this.state = {           
            layout: 'list',
            selectedIssueLog: null,
            visible: false,
            sortKey: null,
            sortOrder: null
        };

        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    } 

    componentDidUpdate(prevProps,prevState){
        if(this.props.dataIssueId !== prevProps.dataIssueId )   {
           // console.log(this.props.dataIssueId)
            this.props.getIssueLogByIssueID(this.props.dataIssueId);
        }
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    clickButtonRenderListItem = (issuelog) => {      
       return this.setState({selectedIssueLog: issuelog, visible: true});
    }

    clickButtonRenderGridItem = (issuelog) => {      
        return this.setState({selectedIssueLog: issuelog, visible: true})
    }

    onChangeHeader = (event) => {
        this.setState({layout: event.value})
    }

    renderListItem(issuelog) {
        return (
            <div className="p-col-12">
                <div className='p-grid p-fluid'>
                    <div className="p-col-12 p-md-2">
                        <img src={process.env.PUBLIC_URL + `assets/layout/images/profile.png`} alt={issuelog.issueLogId} />
                    </div>
                    <div className="p-col-12 p-md-9">
                        <div className="p-grid">
                            <div className="p-col-12">Issue Log ID: <b>{issuelog.issueLogId}</b></div>
                            <div className="p-col-12">User: <b>{`${issuelog.userResponseModel.firstName} ${issuelog.userResponseModel.lastName}`}</b></div>
                            <div className="p-col-12">Log Date: <b>{issuelog.logDate}</b></div>
                            <div className="p-col-12">Issue Message: <b>{issuelog.issueMessage}</b></div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-1">
                        <Button icon="pi pi-search" onClick={(e)=>this.clickButtonRenderListItem(issuelog)}></Button>
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(issuelog) {
        return (
            <div style={MyStyle.padding} className="p-col-12 p-md-3">
                <Panel header={issuelog.issueLogId} style={MyStyle.textAlign}>
                    <img src={process.env.PUBLIC_URL + `assets/layout/images/profile.png`} alt={issuelog.issueLogId} />
                    <div className="car-detail">{issuelog.logDate} - {issuelog.issueMessage}</div>
                    <Button icon="pi pi-search" onClick={(e)=>this.clickButtonRenderGridItem(issuelog)}></Button>
                </Panel>
            </div>
        );
    }

    itemTemplate(issuelog, layout) {
        if (!issuelog)
        {
            return null; //main issue bug on dataviewitem if null
        }

        if (layout === 'list')
            return this.renderListItem(issuelog);
        else if (layout === 'grid')
            return this.renderGridItem(issuelog);
    }

    renderDialogContent() {
        if (this.state.selectedIssueLog) {
            return (
                <div className="p-grid" style={MyStyle.DivStyle}>
                    <div className="p-col-12" style={MyStyle.textAlign}>
                        <img src={process.env.PUBLIC_URL+`assets/layout/images/profile.png`} alt={this.state.selectedIssueLog.issueLogId} />
                    </div>

                    <div className="p-col-4">IssueLogID: </div>
                    <div className="p-col-8">{this.state.selectedIssueLog.issueLogId}</div>

                    <div className="p-col-4">LogDate: </div>
                    <div className="p-col-8">{this.state.selectedIssueLog.logDate}</div>

                    <div className="p-col-4">Message: </div>
                    <div className="p-col-8">{this.state.selectedIssueLog.issueMessage}</div>

                    {/* <div className="p-col-4">Color: </div>
                    <div className="p-col-8">{this.state.selectedIssueLog.color}</div> */}
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!logDate'},
            {label: 'Oldest First', value: 'logDate'},
            {label: 'IssueLogID', value: 'issueLogId'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={MyStyle.left}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={MyStyle.right}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={this.onChangeHeader} />
                </div>
            </div>
        );
    }

    hideDialog = () =>{
        this.setState({visible: false});
    }

    render() {
        const header = this.renderHeader();
        const logs = this.props.ISSUELOGS;
        return (
            <div className="content-section implementation">
                <DataView 
                    value={logs} 
                    layout={this.state.layout} 
                    header={header}
                    itemTemplate={this.itemTemplate}                 
                    paginator={true} 
                    paginatorPosition={'both'}
                    rows={10}       
                    rowsPerPageOptions={[5, 10, 20]}     
                    sortOrder={this.state.sortOrder} sortField={this.state.sortField}
                    />    
                <Dialog header="Issue Log Details" 
                    visible={this.state.visible}                     
                    style={MyStyle.dialog}
                    modal={true} onHide={this.hideDialog}>
                        {this.renderDialogContent()}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        ISSUELOGS: Object.values(state.ISSUELOGS.issueLogsResponse)
    };
};

const mapDispatchToProps = {getIssueLogByIssueID} ;

export default connect(mapStateToProps, mapDispatchToProps)(IssueLogsDataView);