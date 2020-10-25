import React, { Component } from "react";

import { Fieldset } from "primereact/fieldset";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";

import Axios from "axios";

//import FileSaver from "file-saver";
//import { saveAs } from 'file-saver';

class Test extends Component {
  state = {
    result: {},
    reportName: "IssueReport1.pdf"
  };
  async componentDidMount() {
    await Axios.get("http://localhost:8080/itsystem/api/reports/issue/IID4YtVve8ger", {
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
    await Axios.get("http://localhost:8080/itsystem/api/reports/pdf/IID4YtVve8ger", {
      responseType: "blob",
      headers: {
        'Accept': 'application/pdf'
      }
    })
      .then(response => {     
        //const file = new Blob([response.data], { type: "application/pdf" });           
        //const fileURL = URL.createObjectURL(file);      
        // window.open(fileURL);
        // FileSaver.saveAs(file, this.state.reportName);          
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // console.log(this.state.result);
    return (
      <div>
        <button onClick={this.getPDF}>Click</button>
        <div className='content-section implementation flexgrid-demo'>
          <div className='p-grid p-dir-col'>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
                <iframe
                  id="Report"
                  title="Issue Report"
                  src={`data:application/pdf;charset=utf-8;base64,${this.state.result}#toolbar=1`}
                  height='600px'
                  width='100%'
                 loading='lazy'
                />
              </div>
            </div>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
                <Panel header='Signup Form'>
                  <Fieldset legend='Please Fill Up'>
                    <p style={{ textAlign: "justify" }}>
                      The story begins as Don Vito Corleone, the head of a New
                      York Mafia family, oversees his daughter's wedding. His
                      beloved son Michael has just come home from the war, but
                      does not intend to become part of his father's business.
                      Through Michael's life the nature of the family business
                      becomes clear. The business of the family is just like the
                      head of the family, kind and benevolent to those who give
                      respect, but given to ruthless violence whenever anything
                      stands against the good of the family.
                    </p>

                    <div className='p-grid p-fluid'>
                      <div className='p-col-12 p-md-4'>
                        <div className='p-inputgroup'>
                          <span className='p-inputgroup-addon'>
                            <i className='pi pi-user'></i>
                          </span>
                          <InputText placeholder='Username' />
                        </div>
                      </div>

                      <div className='p-col-12 p-md-4'>
                        <div className='p-inputgroup'>
                          <span className='p-inputgroup-addon'>$</span>
                          <InputText placeholder='Price' />
                          <span className='p-inputgroup-addon'>.00</span>
                        </div>
                      </div>

                      <div className='p-col-12 p-md-4'>
                        <div className='p-inputgroup'>
                          <span className='p-inputgroup-addon'>W</span>
                          <InputText placeholder='Website' />
                        </div>
                      </div>
                    </div>
                  </Fieldset>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
