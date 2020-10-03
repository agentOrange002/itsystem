import React, {Component} from "react";
import {connect} from "react-redux";
import { submitUserImage,getUserImage } from "../../../redux/actions/PublicActions";
import {Fieldset} from "primereact/fieldset";
import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import {FileUpload} from 'primereact/fileupload';
import {Button} from "primereact/button";
import Resizer from "react-image-file-resizer";
import HeaderProgressBar from '../../modules/tools/HeaderProgressBar';
import _ from "lodash";

class UserImagePage extends Component {

    state = {          
        userId:'',          
        image: []        
    }

    componentDidMount() {           

    }    

    onUpload = (event) => {
        this.growl.show({ sticky:'true', severity: 'success', summary: 'Success', detail: 'File Uploaded'});
    }

    setImageName = (event) => {
        this.setState({imageName: event.target.value});
    }

    setUserID = (event) => {
      this.setState({userId: event.target.value})
    }

    uploadUserImage = async (event) => {
        await Resizer.imageFileResizer(event.files[0],86,86,'PNG',100,0,
          uri => {
             this.setState({image: [uri]});    
          },
          'base64'
        );
    }  

    submissionUI = (event) => {
      this.props.submitUserImage(this.state);
    }

  render() {    
    return (
      <div>
        <HeaderProgressBar nameofbar={"userimagesubmitBar"} />
    
        <div className='content-section implementation flexgrid-demo'>
          <div className='p-grid p-dir-col'>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>{/* Upper Panel */}</div>
            </div>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
                <Panel header='User Image Signup Form'>
                  <Fieldset legend='Please Fill Up'> 
                    <div className='p-grid p-fluid'>
                      
                      <div className='p-col-12 p-md-12' style={{ paddingTop: "20px" }}>
                        <span className='p-float-label'>
                          <InputText onChange={this.setUserID}/>
                          <label htmlFor='in'>User ID</label>
                        </span>
                      </div>                        
                      <div className='p-col-12 p-md-12 p-col-align-right'style={{ paddingTop: "20px" }}>                       
                      <FileUpload mode="basic"  auto={true} accept="image/*" maxFileSize={1000000} onUpload={this.onUpload} customUpload={true} uploadHandler={this.uploadUserImage} />
                      </div>               
                      <div className='p-col-12 p-md-12 p-col-align-center'style={{ paddingTop: "20px" }}>
                        { _.isEmpty(this.state.image) ? undefined : <img alt='Upload' src={this.state.image} style={{display:'block',marginLeft:'auto',marginRight:'auto'}}/> }
                        {/* { _.isEmpty(this.props.getuserimage.getuserimageState.userimageResponse.image) ? undefined : <img alt='GetImage' label="getImage" src={`data:image/png;charset=utf-8;base64,${this.props.getuserimage.getuserimageState.userimageResponse.image}`} style={{display:'block',marginLeft:'auto',marginRight:'auto'}}/> } */}
                                       
                      </div> 
                    </div>
                  </Fieldset>   
                  <div className='button'>
                    <span>
                      <Button
                        label='Upload'
                        // icon='pi pi-check'
                        style={{ marginRight: ".25em", float: "right" }}
                        onClick={this.submissionUI}
                      />
                    </span>
                  </div>          

                   <div className='button'>
                    <span>
                      <Button
                        label='GETIMAGE'
                        // icon='pi pi-check'
                        style={{ marginRight: ".25em", float: "right" }}
                        onClick={this.props.getUserImage}
                      />
                    </span>
                  </div>           
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    submituserimage: state.PUBLICSUBMITUSERIMAGE,
    getuserimage: state.PUBLICGETUSERIMAGE
  };
};

const mapDispatchToProps = dispatch => ({
  submitUserImage: (param) => dispatch(submitUserImage(param)),
  getUserImage: () => dispatch(getUserImage()),
});

export default connect(mapStateToProps,mapDispatchToProps)(UserImagePage);
