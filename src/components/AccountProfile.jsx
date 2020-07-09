import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Password } from 'primereact/password';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import _ from 'lodash';
import { FileUpload } from 'primereact/fileupload';
import Resizer from "react-image-file-resizer";
import { ProfileUpdate } from '../redux/actions/LoginActions';


const MyStyle = {
    Panel: { paddingBottom: '1em' },
    DivButton: { paddingTop: "10px", paddingBottom: "35px" },
    Button: { marginRight: ".25em", float: "right", width: '170px' },
    image: { display: 'block', marginRight: 'auto', marginLeft: 'auto', paddingBottom: '1em' },
    imageBorder: { borderStyle: 'solid', borderRadius: '25px', width: '220px' },
    h3: { textAlign: 'center' },
    width: { width: '170px' },
    fileupload: { display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' },
    span: { textAlign: 'center', display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' }
}

class AccountProfile extends Component {

    state = {
        profile: {},
        image: [],
        items: [
            { label: 'Profile', icon: 'pi pi-fw pi-user' },
            { label: 'Address', icon: 'pi pi-fw pi-list' },
            { label: 'Image', icon: 'pi pi-fw pi-image' },
            { label: 'Password', icon: 'pi pi-fw pi-lock' },
            // { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ]
    }

    componentDidMount() {
        this.setState({ profile: this.props.LOGIN_PROFILE });
    }

    onClickUpdateProfile = (event) => {
        event.preventDefault();
        this.props.ProfileUpdate({ firstName: this.state.profile.firstName, lastName: this.state.profile.lastName });
    }

    renderProfile = () => {
        return (
            <>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="userid">User ID</label>
                        <InputText id="userid" type="text" defaultValue={this.state.profile.userId} onChange={(e) => this.setState({ profile: { ...this.state.profile, userId: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="email">E-mail Address</label>
                        <InputText id="email" type="email" defaultValue={this.state.profile.email} onChange={(e) => this.setState({ profile: { ...this.state.profile, email: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname6">Firstname</label>
                        <InputText id="firstname6" type="text" defaultValue={this.state.profile.firstName} onChange={(e) => this.setState({ profile: { ...this.state.profile, firstName: e.target.value } })} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="lastname6">Lastname</label>
                        <InputText id="lastname6" type="text" defaultValue={this.state.profile.lastName} onChange={(e) => this.setState({ profile: { ...this.state.profile, lastName: e.target.value } })} />
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
        const listAddress = this.props.LOGIN_PROFILE.addresses.map((address, index) => {
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
        });
        return (
            <>
                {listAddress}
                <div className='button' style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-plus'
                            label='Add New Address'
                            style={MyStyle.Button}
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
                    <div className="p-field p-col-6 " style={MyStyle.imageBorder}>
                        <h3 style={MyStyle.h3}>Current Image</h3>
                        {_.isEmpty(this.props.LOGIN_PROFILE.userImage.image) ? undefined : <img alt='UserImage' label="UserImage" src={`data:image/png;charset=utf-8;base64,${this.props.LOGIN_PROFILE.userImage.image}`} style={MyStyle.image} />}
                        <span style={MyStyle.span}>
                            <label style={MyStyle.h3} >Image ID : {this.props.LOGIN_PROFILE.userImage.imageId}</label>
                        </span>
                    </div>
                    <div className="p-field p-col-6">
                        <h3 style={MyStyle.h3}>Upload New Profile Image</h3>
                        {_.isEmpty(this.state.image) ? undefined : <img alt='UploadImage' label="UploadImage" src={this.state.image} style={MyStyle.image} />}

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

    renderSwitch = (param) => {
        switch (param) {
            case 'Profile':
                return this.renderProfile();
            case 'Address':
                return this.renderAddress();
            case 'Image':
                return this.renderImage();
            case 'Password':
                return this.renderPassword();
            default:
                return this.renderProfile();
        }
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({ activeItem: e.value })} />
                    <div className="card card-w-title">
                        <h1>Account {_.isEmpty(this.state.activeItem) ? 'Profile' : this.state.activeItem.label}</h1>
                        {_.isEmpty(this.state.activeItem) ? this.renderProfile() : this.renderSwitch(this.state.activeItem.label)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        LOGIN_PROFILE: state.LOGIN_PROFILE.profileState.profileResponse
    };
};

const masDispatchToProps = { ProfileUpdate };
export default connect(mapStateToProps, masDispatchToProps)(AccountProfile);