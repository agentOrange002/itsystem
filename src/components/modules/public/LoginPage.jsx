import React, { Component } from 'react';
import { connect } from "react-redux";
import { LoginAuthentication } from "../../../redux/actions/LoginActions";
import { Field, reduxForm } from 'redux-form';
import { errorEmail, warningAol, minLength10 } from '../../messages/errorFieldNotification';
import { Link } from "react-router-dom";
import history from "../../../routes/history";
import { Fieldset } from "primereact/fieldset";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import logo from "../../../images/Logo.png";
import HeaderProgressBar from '../tools/HeaderProgressBar';
import { motion } from 'framer-motion';
import _ from 'lodash';

const MyStyle = {
    LoginSpanStyle: { width: '100%' },
    DivStyle: { paddingTop: "15px" },
    ButtonDivStyle: { paddingTop: '10px', paddingBottom: "35px" },
    loginButton: { float: "right" },
    BoxDivStyle: { paddingTop: "1em" },
    LinkStyleLeft: { display: 'block', marginLeft: '.25em', float: 'left' },
    LinkStyleRight: { display: 'block', marginRight: '.25em', float: 'right' },
    LogoStyle: { display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2em',paddingBottom: '2em', width: '30%' }
}

const renderPassword = ({ input, label, meta: { touched, error, warning } }) => {
    return (
        <div className='p-col-12 p-md-12' style={MyStyle.DivStyle}>
            <div className='p-inputgroup'>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                </span>
                <span className='p-float-label' style={MyStyle.LoginSpanStyle}>
                    <Password {...input} className={error ? `p-error` : undefined} feedback={false} />
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

const renderEmail = ({ input, label, meta: { touched, error, warning } }) => {
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
            this.showWelcome();
        }
    }

    showWelcome() {
        this.messages.show({
            sticky: false,
            severity: 'info',
            summary: 'Welcome to ITS',
            detail: '_Login Page!'
        });
    }

    showError(message) {
        let msg = message;
        if(_.isEmpty(message))
            msg = "Authentication Failed";
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message :",
            detail: msg
        });
    }

    onSubmit = async (formValues) => {
        await this.props.LoginAuthentication(formValues);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.ERROR_MESSAGE !== prevProps.ERROR_MESSAGE) {
            if (this.props.ERROR) {
                this.showError(this.props.ERROR_MESSAGE.message);
            }
        }
    }

    render() {
        return (
            <>
                <HeaderProgressBar nameofbar={"loginBar"} />
                <div className='p-grid p-dir-col p-nogutter'>
                    <motion.div
                        initial={{ y: -250 }}
                        animate={{ y: 0 }}
                        transition={{ delay: .10, type: "spring" }}
                        className="p-col-12 p-lg-4 p-col-align-center" >
                        <img src={logo} alt='Logo' style={MyStyle.LogoStyle} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .80, duration: 1 }}
                        className="p-col-12 p-md-3 p-lg-4 p-col-align-center">
                        <div className="box">

                            <Panel header='Issue Tracking System'>
                                <Messages ref={el => (this.messages = el)}></Messages>
                                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                    <Fieldset legend='Login Form'>
                                        <div className='p-grid p-fluid'>
                                            <Field name="email" type="email" label="E-mail" component={renderEmail} validate={[errorEmail, minLength10]} warn={warningAol} />
                                            <Field name="password" type="password" label="Password" component={renderPassword} validate={minLength10} />
                                        </div>
                                    </Fieldset>
                                    <div className='button' style={MyStyle.ButtonDivStyle}>
                                        <div style={MyStyle.loginButton}>
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.1,
                                                    textShadow: "0px 0px 8px rgb(255,255,255)",
                                                    boxShadow: "0px 0px 8px rgb(255,255,255)"
                                                }}>
                                                <Button label='Login' icon='pi pi-sign-in' />
                                            </motion.div>
                                        </div>
                                    </div>
                                </form>
                            </Panel>

                        </div>
                        <div className="box" style={MyStyle.BoxDivStyle}>
                            <Link to="#" style={MyStyle.LinkStyleLeft}><u>Forgot Password?</u></Link>
                            <Link to="/signup" style={MyStyle.LinkStyleRight}><u>Sign Up</u></Link>
                        </div>
                    </motion.div>
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
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        ERROR: state.LOGIN_AUTHENTICATION.loginState.fetchError,
        ERROR_MESSAGE: state.LOGIN_AUTHENTICATION.loginState.fetchErrorMessage
    };
};

const mapDispatchToProps = { LoginAuthentication };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);