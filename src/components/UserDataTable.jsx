import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {CarService} from '../service/CarService';

class UserDataTable extends Component {

    constructor() {
        super();
        this.state = {
            cars: null
        };

        this.carservice = new CarService();
    }

    componentDidMount() {
      this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
    }
    displaySelection(data) {
      if(!data || data.length === 0) {
          return <div style={{textAlign: 'left'}}>No Selection</div>;
      }
      else {
          if(data instanceof Array)
              return <ul style={{textAlign: 'left', margin: 0}}>{data.map((car,i) => <li key={car.vin}>{car.vin + ' - ' + car.year + ' - ' + car.brand + ' - ' + car.color}</li>)}</ul>;
          else
              return <div style={{textAlign: 'left'}}>Selected Car: {data.vin + ' - ' + data.year + ' - ' + data.brand + ' - ' + data.color}</div>
      }
  }

    render() {
      const paginatorLeft = <Button icon="pi pi-refresh"/>;
        return (
            <div>
                {/* <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Issues - DataTable</h1>
                        <p>List of Issues with corresponding details</p>
                    </div>
                </div> */}

                <div className="content-section implementation">
                <DataTable 
                  value={this.state.cars} 
                  selectionMode="single" 
                  header="User DataTable" 
                  footer={this.displaySelection(this.state.selectedCar1)}                        
                  selection={this.state.selectedCar1} 
                  onSelectionChange={e => this.setState({selectedCar1: e.value})}
                  paginator={true} 
                  paginatorLeft={paginatorLeft}  
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" 
                  rows={10} 
                  rowsPerPageOptions={[5,10,20]} >
                        <Column field="vin" header="Vin" />
                        <Column field="year" header="Year" />
                        <Column field="brand" header="Brand" />
                        <Column field="color" header="Color" />
                    </DataTable>
                </div>
            </div>
        );
    }
}

 
export default UserDataTable;