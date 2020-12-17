import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {getIssueLogByIssueID} from '../../../redux/actions/IssueLogsActions';

class IssueLogsPage extends Component {
  state = {
    data: [{issueLogId:'TESTid',issueMessage:'TEST MESSAGE',logDate:'2020-12-12'}],
    selectedIssueLog: null,
    products: null,
    editDialog: false,
    deleteDialog: false,   
    product: this.emptyProduct,
    selectedProducts: null,
    submitted: false,
    globalFilter: null,
  };

  async componentDidMount() {
    const { issueid } = this.props.match.params;
    await this.props.getIssueLogByIssueID(issueid);
  }

  refreshTable = async (event) => {
    const { issueid } = this.props.match.params;
    event.preventDefault();
    await this.props.getIssueLogByIssueID(issueid);
  };

  hideContext = () => {
    this.setState({ selectedIssueLog: null });
  };

  displaySelection(data) {
    if (!data || data.length === 0) {
      return <div style={{ textAlign: "left" }}>No Selection</div>;
    } else {
      if (data instanceof Array)
        return (
          <ul style={{ textAlign: "left", margin: 0 }}>
            {data.map((issuelog, i) => (
              <li key={issuelog.issueLogId}>
                {issuelog.issueLogId +
                  " - " +
                  issuelog.issueMessage +
                  " - " +
                  issuelog.logDate
                 }
              </li>
            ))}
          </ul>
        );
      else
        return (
          <div style={{ textAlign: "left" }}>
            Selected IssueLog:{" "}
            {data.issueLogId +
             " - " +
             data.issueMessage +
             " - " +
             data.logDate}
          </div>
        );
    }
  }

  editProduct(product) {
    this.setState({
      product: { ...product },
      productDialog: true,
    });
  }

  confirmDeleteProduct(product) {
    this.setState({
      product,
      deleteProductDialog: true,
    });
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  }

  render() {
    const paginatorLeft = (
      <Button icon="pi pi-refresh" onClick={this.refreshTable} />
    );
    return (
      <>
        <div className="p-grid p-fluid">
          <div className="p-col-12">
            <div className="content-section implementation">
              <DataTable
                value={this.state.data}
                scrollable={true}
                selectionMode="single"
                header="My Issue Logs"
                footer={this.displaySelection(this.state.selectedIssueLog)}
                selection={this.state.selectedIssueLog}
                onSelectionChange={(e) =>
                  this.setState({ selectedIssueLog: e.value })
                }
                paginator={true}
                paginatorLeft={paginatorLeft}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rows={10}
                rowsPerPageOptions={[5, 10, 20]}
              >
                <Column 
                  body={this.actionBodyTemplate}  
                  header="Actions"
                  style={{ width: "120px" }} />
                <Column
                  field="issueLogId"
                  header="IssueLog ID"
                  style={{ width: "150px" }}
                />
                <Column
                  field="issueMessage"
                  header="Log Message"
                  style={{ width: "700px" }}
                />
                <Column
                  field="logDate"
                  header="Log Date"
                  style={{ width: "170px" }}
                />
                <Column
                  field="issueLogUserDetails.userId"
                  header="LogBy ID"
                  style={{ width: "200px" }}
                />
                <Column
                  field="issueLogUserDetails.fullName"
                  header="LogBy"
                  style={{ width: "200px" }}
                />               
              </DataTable>
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
        MYDOCUMENTS: state.MYDOCUMENTS.mydocumentResponse[issueid]
    };
};

const mapDispatchToProps = {getIssueLogByIssueID};

export default connect(mapStateToProps, mapDispatchToProps)(IssueLogsPage);