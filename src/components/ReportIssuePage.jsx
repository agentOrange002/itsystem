import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitReportIssue} from "../redux/actions/PublicActions";
import {Field, reduxForm} from 'redux-form';
import {errorEmail, warningAol, maxLength150, minLength10} from './messages/errorFieldNotification';

import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Fieldset} from "primereact/fieldset";
import {Messages} from "primereact/messages";

import HeaderProgressBar from './HeaderProgressBar';

import {ToastContainer} from 'react-toastify';

class ReportIssuePage extends Component
{
    state = {
        isError: false
    }

    renderInput({input, label, meta: {touched, error, warning}})
    {
        return (
            <div className='p-col-12 p-md-12' style={{paddingTop: "20px"}}>
                <span className="p-float-label">
                    <InputText id="in"{...input} className={error ? `p-error` : undefined} style={{width: "100%"}} tooltip={`Enter your ${label}`} />
                    <label htmlFor="in">{label}</label>
                </span>
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

    renderTextArea({input, label, meta: {touched, error, warning}})
    {
        return (
            <div className='p-col-12 p-md-12' style={{paddingTop: "20px"}}>
                <span className="p-float-label">
                    <InputTextarea {...input}
                        style={{width: "100%"}}
                        rows={5} cols={30}
                        tooltip={`Enter your ${label}`}
                        className={error ? `p-error` : undefined}
                    />
                    <label htmlFor="in">{label}</label>
                </span>
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

    onSubmit = (formValues) =>
    {
        this.props.submitreportissue(formValues)
    }

    render()
    {
        return (
            <>
                <HeaderProgressBar nameofbar={"reportissueBar"} />
                <div style={{paddingTop: '10vh'}}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {/* Same as */}
                    <ToastContainer />

                    <div className='content-section implementation flexgrid-demo'>
                        <div className='p-grid p-dir-col'>
                            {/* <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
                        <div className='box'>
                            <div className='isa_welcome' style={{display:'block',marginLeft:'auto',marginRight:'auto',paddingTop:'1em',paddingBottom:'1em',borderRadius:'15px'}}>                          
                                <h1 style={{textAlign:'center'}}>Submit the issue to IT Support</h1> 
                            </div>   
                        </div>
                    </div> */}
                            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
                                <div className='box'>
                                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                        <Panel header='Information Techonology Support System' >
                                            <Messages ref={el => (this.messages = el)}></Messages>
                                            <Fieldset legend='Report Issue Form'>
                                                <Field name="reportedBy" label="Full Name" component={this.renderInput} validate={minLength10} />
                                                <Field name="emailProvided" type="email" label="E-mail Address" component={this.renderInput} validate={errorEmail} warn={warningAol} />
                                                <Field name="subject" label="Subject" component={this.renderInput} validate={minLength10} />
                                                <Field name="description" label="Description" component={this.renderTextArea} validate={[minLength10, maxLength150]} />
                                            </Fieldset>
                                            <div className='button' style={{paddingTop: '10px', paddingBottom: "35px"}}>
                                                <span>
                                                    <Button
                                                        label='Submit'
                                                        // icon='pi pi-check'
                                                        style={{marginRight: ".25em", float: "right"}}
                                                    />
                                                </span>
                                            </div>
                                        </Panel>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const ripForm = reduxForm({
    form: 'reportIssue'
})(ReportIssuePage);

const mapStateToProps = state =>
{
    return {
        reportissue: state.PUBLICREPORTISSUE
    };
};

const mapDispatchToProps = dispatch => ({
    submitreportissue: (formValues) => dispatch(submitReportIssue(formValues))
});

export default connect(mapStateToProps, mapDispatchToProps)(ripForm);