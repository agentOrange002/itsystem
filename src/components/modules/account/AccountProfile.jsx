import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import _ from 'lodash';
import { FileUpload } from 'primereact/fileupload';
import Resizer from "react-image-file-resizer";
import { ProfileUpdate,LoginProfile } from '../../../redux/actions/LoginActions';
import { submitUserImage,updateUserImage } from '../../../redux/actions/UsersActions';
import { TabView, TabPanel } from 'primereact/tabview';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import AddAddressDialog from './AddAddressDialog';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";

const urlparam = `${window.location.origin}/#/app/accountprofile`;

const MyStyle = {   
    Panel: { paddingBottom: '1em' },
    DivButton: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '170px' },
    image: { display: 'block', marginRight: 'auto', marginLeft: 'auto', paddingBottom: '1em' },
    imageBorder: { borderStyle: 'solid', borderRadius: '150px', width: '50%' ,borderColor:'black'},
    h3: { textAlign: 'center' },
    width: { width: '170px' },
    fileupload: { display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '110px', paddingBottom: '1em' },
    span: { textAlign: 'center', display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' },
    DialogStyle : {width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'},
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

class AccountProfile extends Component {
  state = {
            profile: {},
            image: [],
            profileimg: "assets/layout/images/profile.png" ,    
            addressDialog: false,
            breadcrumdItems: [
                { label: 'Account Profile',url: `${urlparam}`},            
            ],
            home: {
                icon: 'pi pi-home', command: () => { history.push('/app/'); }
            },
    }

    componentDidMount() {
        this.setState({ profile: this.props.LOGIN_PROFILE });
    }

    onClickUpdateProfile = async (event) => {
        event.preventDefault();
        await this.props.ProfileUpdate({ 
            firstName: this.state.profile.firstName, 
            middleName: this.state.profile.middleName, 
            lastName: this.state.profile.lastName,
            fullName: `${this.state.profile.firstName} ${this.state.profile.middleName} ${this.state.profile.lastName}`
        });
    }

    updateImage = async (event) => {
        event.preventDefault();      
        if(_.isEmpty(this.props.LOGIN_PROFILE.userImage)){
            await this.props.submitUserImage({image:this.state.image});
            this.props.LoginProfile();
        }
        else{
            await this.props.updateUserImage({image:this.state.image});
            this.props.LoginProfile();
        }
    }

    addAddress = async (event) => {
        event.preventDefault();
        this.setState({addressDialog: true});      
    }
  
    renderProfile = () => {          
        return (
            <>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="userid">User ID:</label>
                        <InputText id="userid" type="text" defaultValue={this.state.profile.userId} onChange={(e) => this.setState({ profile: { ...this.state.profile, userId: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="email">E-mail Address:</label>
                        <InputText id="email" type="email" defaultValue={this.state.profile.email} onChange={(e) => this.setState({ profile: { ...this.state.profile, email: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="firstname6">First Name:</label>
                        <InputText id="firstname6" type="text" defaultValue={this.state.profile.firstName} onChange={(e) => this.setState({ profile: { ...this.state.profile, firstName: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="middlename6">Middle Name:</label>
                        <InputText id="middlename6" type="text" defaultValue={this.state.profile.middleName} onChange={(e) => this.setState({ profile: { ...this.state.profile, middleName: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="lastname6">Last Name:</label>
                        <InputText id="lastname6" type="text" defaultValue={this.state.profile.lastName} onChange={(e) => this.setState({ profile: { ...this.state.profile, lastName: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <label htmlFor="fullname6">Full Name:</label>
                        <InputText id="fullname6" type="text" value={this.state.profile.firstName+" "+this.state.profile.middleName+" "+this.state.profile.lastName} readOnly />
                    </div>
                </div>
                <div className='button' style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-save'
                            label='Update Profile'
                            style={MyStyle.Button}
                            onClick={this.onClickUpdateProfile}
                        />
                    </span>
                </div>

            </>
        );
    }

    renderAddress = () => {
        let listAddress = null;
        if(!_.isEmpty(this.props.LOGIN_PROFILE)){
            listAddress = this.props.LOGIN_PROFILE.addresses.map((address, index) => {
            return (
                <Panel key={index} header={`Type: ${address.type}`} style={MyStyle.Panel} toggleable={true}>
                    <div className="p-fluid p-grid">
                        <div className="p-col-12 p-md-4">
                            <label>Country</label>
                            <InputText type="text" value={address.country} readOnly />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <label >City</label>
                            <InputText type="text" value={address.city} readOnly />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <label >Postal Code</label>
                            <InputText type="text" value={address.postalCode} readOnly />
                        </div>
                        <div className="p-col-12 p-md-12">
                            <label >Street Name</label>
                            <InputText type="text" value={address.streetName} readOnly />
                        </div>
                    </div>
                </Panel>
            );
        });}
        return (
            <>
                {listAddress}
                <div className='button' style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-plus'
                            label='Add New Address'
                            style={MyStyle.Button}
                            onClick={this.addAddress}
                        />
                    </span>
                </div>
            </>
        );
    }

    uploadUserImage = async (event) => {
        await Resizer.imageFileResizer(event.files[0], 86, 86, 'PNG', 100, 0,
            uri => {
                this.setState({ image: [uri] });
            },
            'base64'
        );
    }

    renderImage = () => {
        return (
            <>
                <div className="p-fluid p-formgrid p-grid">              
                    <div className="p-col-12 p-md-6" style={MyStyle.imageBorder}>                      
                        <h3 style={MyStyle.h3}>Current Image</h3>
                        {/* {_.isEmpty(this.props.LOGIN_PROFILE.userImage.image) ? undefined : <img alt='UserImage' label="UserImage" src={`data:image/png;charset=utf-8;base64,${this.props.LOGIN_PROFILE.userImage.image}`} style={MyStyle.image} />} */}
                        <img src={_.isEmpty(this.props.LOGIN_PROFILE.userImage) ? this.state.profileimg : `data:image/png;charset=utf-8;base64,${this.props.LOGIN_PROFILE.userImage.image}`} alt='UserImage' label="UserImage" style={MyStyle.image} />
                         <span style={MyStyle.span} >
                            <label style={MyStyle.h3} >Image ID : {_.isEmpty(this.props.LOGIN_PROFILE.userImage) ? "NONE" :this.props.LOGIN_PROFILE.userImage.imageId}</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6" style={MyStyle.imageBorder}>
                        <h3 style={MyStyle.h3}>Upload New Profile Image</h3>
                        {/* {_.isEmpty(this.state.image) ? undefined : <img alt='UploadImage' label="UploadImage" src={this.state.image} style={MyStyle.image} />} */}
                        <img src={_.isEmpty(this.state.image)? this.state.profileimg : this.state.image } alt='UploadImage' label="UploadImage"  style={MyStyle.image} />
                        <span style={MyStyle.fileupload}>
                            <FileUpload mode="basic" auto={true} accept="image/*" maxFileSize={1000000} onUpload={this.onUpload} customUpload={true} uploadHandler={this.uploadUserImage} />
                        </span>
                    </div>
                </div>
                <div className='button' style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-save'
                            label='Update Image'
                            style={MyStyle.Button}
                            onClick={this.updateImage}
                        />
                    </span>
                </div>
            </>
        );
    }

    renderPassword = () => {
        return (
            <>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12">
                        <label htmlFor="newpassword">New Password</label>
                        <Password id="newpassword" />
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <Password id="confirmpassword" />
                    </div>
                </div>
                <div className='button' style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-save'
                            label='Change Password'
                            style={MyStyle.Button}
                        />
                    </span>
                </div>
            </>
        );
    }

    hideAddressDialog = () => {
        this.setState({ addressDialog: false });
    }

    render() {
        return (
            <>
            <div style={MyStyle.breadcrumbBG}>
                <BreadCrumb style={MyStyle.breadcrumb} model={this.state.breadcrumdItems} home={this.state.home} />
            </div>
            <div className='layout-main-inside'>            
            <div className="p-grid">
                <div className="p-col-12">              
                    <TabView style={{marginLeft:'0'}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                        <TabPanel header="Profile" leftIcon='pi pi-fw pi-user'>
                            <Fieldset legend="Account Profile">
                                {this.renderProfile()}
                            </Fieldset>
                        </TabPanel>
                        <TabPanel header="Address" leftIcon='pi pi-fw pi-list'>
                            <Fieldset legend="Account Address">
                                {this.renderAddress()}
                            </Fieldset>
                        </TabPanel>
                        <TabPanel header="Image" leftIcon='pi pi-fw pi-image'>
                            <Fieldset legend="Account Image">
                                {this.renderImage()}
                            </Fieldset>
                        </TabPanel>
                        <TabPanel header="Password" leftIcon='pi pi-fw pi-lock'>
                            <Fieldset legend="Account Password">
                                {this.renderPassword()}
                            </Fieldset>
                        </TabPanel>
                    </TabView>
                    <Dialog
                        header="Add New Address"
                        visible={this.state.addressDialog}
                        style={MyStyle.DialogStyle}
                        modal={true}
                        onHide={this.hideAddressDialog}>
                        <AddAddressDialog hidethis={this.hideAddressDialog} />
                    </Dialog>
                </div>
            </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        LOGIN_PROFILE: state.LOGIN_PROFILE.profileState.profileResponse
    };
};

const masDispatchToProps = { LoginProfile,ProfileUpdate,submitUserImage,updateUserImage };

export default connect(mapStateToProps, masDispatchToProps)(AccountProfile);