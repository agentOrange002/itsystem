import React, {Component} from 'react';
import {connect} from "react-redux";
import {LoginAuthentication} from "../redux/actions/LoginActions";
import {Field, reduxForm} from 'redux-form';
import {errorEmail, warningAol, minLength10} from './messages/errorFieldNotification';
import {Link} from "react-router-dom";
import history from "../routes/history";

import {Fieldset} from "primereact/fieldset";
import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Messages} from "primereact/messages";

import logo from "../images/Logo.png";
import '../stylesheets/jimboynewSS.css';
import HeaderProgressBar from './HeaderProgressBar';


const MyStyle = {
    LoginSpanStyle : {width:'100%'},
    DivStyle : {paddingTop: "15px"},
    ButtonDivStyle : {paddingTop: '10px', paddingBottom: "35px"},
    LoginButtonStyle : {marginRight: ".25em", float: "right"},
    BoxDivStyle : {paddingTop: "1em"},
    LinkStyleLeft : {display: 'block', marginLeft: '.25em', float: 'left'},
    LinkStyleRight : {display: 'block', marginRight: '.25em', float: 'right'},
    LogoStyle : {display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2em', width: '30%'}
}

const renderPassword = ({input, label, meta: {touched, error, warning}}) => {
    return (
        <div className='p-col-12 p-md-12' style={MyStyle.DivStyle}>       
            <div className='p-inputgroup'>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                </span>
                <span className='p-float-label' style={MyStyle.LoginSpanStyle}>
                    <Password {...input} className={error ? `p-error` : undefined} feedback={false}/>
                    <label htmlFor='in'>{label}</label>
                </span>
            </div>    
            {touched && ((error &&
                <span>
                    <div className="isa_error">
                        <i className="pi pi-times"></i>
                        {error}
                    </div>
                </span>
            ) || (warning &&
                <span>
                    <div className="isa_warning">
                        <i className="pi pi-question"></i>
                        {warning}
                    </div>
                </span>
                ))}
        </div>
    );
}

const renderEmail = ({input, label, meta: {touched, error, warning}}) => {
    return (
        <div className='p-col-12 p-md-12' style={MyStyle.DivStyle}>   
            <div className='p-inputgroup'>     
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <span className='p-float-label' style={MyStyle.LoginSpanStyle}>
                    <InputText {...input} className={error ? `p-error` : undefined} />
                    <label htmlFor='in'>{label}</label>
                </span>
            </div>          
            {touched && ((error &&
                <span>
                    <div className="isa_error">
                        <i className="pi pi-times"></i>
                        {error}
                    </div>
                </span>
            ) || (warning &&
                <span>
                    <div className="isa_warning">
                        <i className="pi pi-question"></i>
                        {warning}
                    </div>
                </span>
                ))}
        </div>
    );
}

class LoginPage extends Component {
    componentDidMount() {
        if (this.props.LOGIN_AUTHENTICATION.loginState.isAuthenticated) {
            history.push("/app/");
        }
        else {
            if (this.props.LOGIN_AUTHENTICATION.loginState.fetchError) {
                this.showError();
            }
            else {
                this.showWelcome();
            }
        }
    }

    showWelcome() {
        this.messages.show({
            sticky: false,
            severity: 'info',
            summary: 'Welcome to ITS System',
            detail: 'Login Page!'
        });
    }

    showError() {
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message",
            detail: "Login failed"
        });
    }

    onSubmit = (formValues) => {       
        this.props.LoginAuthentication(formValues);
    }

    render() {
        return (
            <>
                <HeaderProgressBar nameofbar={"loginBar"} />
                <div className='p-grid p-dir-col'>
                    <div className="p-col-12 p-lg-4 p-col-align-center" >
                        <img src={logo} alt='Logo' style={MyStyle.LogoStyle} />
                    </div>
                    <div className="p-col-12 p-md-3 p-lg-4 p-col-align-center">
                        <div className="box">
                            <Panel header='Infomation Technology Support System'>
                                <Messages ref={el => (this.messages = el)}></Messages>
                                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                    <Fieldset legend='Login Form'>
                                        <div className='p-grid p-fluid'>
                                            <Field name="email" type="email" label="E-mail" component={renderEmail} validate={[errorEmail, minLength10]} warn={warningAol} />
                                            <Field name="password" type="password" label="Password" component={renderPassword} validate={minLength10} />
                                        </div>
                                    </Fieldset>
                                    <div className='button' style={MyStyle.ButtonDivStyle}>
                                        <span>
                                            <Button label='Login' icon='pi pi-sign-in' style={MyStyle.LoginButtonStyle} />
                                        </span>
                                    </div>
                                </form>
                            </Panel>
                        </div>
                        <div className="box" style={MyStyle.BoxDivStyle}>
                            <Link to="#" style={MyStyle.LinkStyleLeft}><u>Forgot Password?</u></Link>
                            <Link to="/signup" style={MyStyle.LinkStyleRight}><u>Sign Up</u></Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const LoginForm = reduxForm({
    form: 'loginpage'
})(LoginPage);

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION
    };
};

// const mapDispatchToProps = dispatch => ({
//     LoginAuthentication: (formValues) => dispatch(LoginAuthentication(formValues))
// });
const mapDispatchToProps = {LoginAuthentication};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);