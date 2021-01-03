import React, { Component } from "react";

import Axios from "axios";
//import FileSaver from "file-saver";
//import { saveAs } from 'file-saver';
import _ from "lodash";

class Test extends Component {
  state = {
    result: {},
    reportBlob: {},
    reportName: "IssueReport.pdf"
  };
  async componentDidMount() {
    await Axios.get("http://localhost:8080/itsystem/api/reports/pdf/IID3CMU4gdxEN", {
      responseType: "arraybuffer"
    })
      .then(response => {
        const res = Buffer.from(response.data, "binary").toString("base64");
        this.setState({ result: res });
      })
      .catch(error => console.log(error));
  }

  getPDF = async (event) => {
      event.preventDefault();
    await Axios.get("http://localhost:8080/itsystem/api/reports/issue/IID3CMU4gdxEN", {
      responseType: "blob",
      headers: {
        'Accept': 'application/pdf'
      }
    })
      .then(response => {     
        const file = new Blob([response.data], { type: "application/pdf" , title: "IssueReport"});  
       // const reader = new FileReader();
       // const dablob = reader.readAsBinaryString(file);
            
        const fileURL = URL.createObjectURL(file); 
        this.setState({ reportBlob:  fileURL });             
        //window.open(fileURL);
        //FileSaver.saveAs(file, this.state.reportName);          
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
   
    return (
      <div className='layout-main-inside'>
        <button onClick={this.getPDF}>Click</button>
        <div className='content-section implementation flexgrid-demo'>
          <div className='p-grid p-dir-col'>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
                <iframe
                  title="Issue Report2"
                  id="Report2"                
                  type="application/pdf"
                  src={`data:application/pdf;charset=utf-8;base64,${this.state.result}#toolbar=1`}
                  height='600px'
                  width='100%'
                  
                />
              </div>
            </div>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
              <iframe
                title="Issue Report1" 
                  id="Report1"                  
                  type="application/pdf"
                  src= {_.isEmpty(this.state.reportBlob) ? null :this.state.reportBlob }
                  height='600px'
                  width='100%'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
