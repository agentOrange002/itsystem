import React, {Component} from 'react';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {connect} from 'react-redux';
import {saveIssueLog} from "../../../redux/actions/IssueLogsActions";
import {Field, reduxForm} from 'redux-form';
import {maxLength150, minLength10} from '../../messages/errorFieldNotification';

const MyStyle = {
    Div: {paddingTop: "20px"},
    width: {width: "100%"},
    position: {position: 'top'},
    DivButton:{paddingTop: "10px", paddingBottom: "35px"} ,
    Button:{marginRight: ".25em", float: "right", width: '160px'},
}

class IssueLogMessage extends Component {
    
    state = {
        isSuccess: false,
        isError: false
    }
 
    onSubmit = (formValues) => {
        let userId = this.props.LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
        let issueId = this.props.dataIssueId;           
        this.props.saveIssueLog(formValues,issueId,userId).then(() => this.props.onVisible(false));
    }    

    renderTextArea({input, label, meta: {touched, error, warning}}) {
        return (
            <div className='p-col-12 p-md-12' style={MyStyle.Div}>
                <span className="p-float-label">
                    <InputTextarea id="log"
                        {...input}
                        style={MyStyle.width}
                        className={error ? `p-error` : undefined}
                        rows={5} cols={30}
                        tooltip='Issue Log Message'
                        tooltipOptions={MyStyle.position}
                    />
                    <label htmlFor="log">{label}</label>
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
        )
    }

    render() {
        return (
            <div>               
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Fieldset legend='Message Form'>
                    <div className='p-col-12 p-md-12'>
                        <span className="p-float-label">
                            <InputText id="issueId"
                                value={this.props.dataIssueId}
                                style={MyStyle.width}
                                tooltip='Issue ID' tooltipOptions={MyStyle.position}
                                readOnly />
                            <label htmlFor="issueId">Issue ID</label>
                        </span>
                    </div>
                    <Field name="issueMessage" label="Issue Log Message" component={this.renderTextArea} validate={[minLength10, maxLength150]} />
                </Fieldset>
                <div className='button'
                    style={MyStyle.DivButton}>
                    <span>
                        <Button
                            icon='pi pi-plus'
                            label='Add Message'
                            style={MyStyle.Button}
                        />
                    </span>
                </div>
                </form>
            </div>
        );
    }
}

const newForm = reduxForm({
    form: 'addNewIssueLog'
})(IssueLogMessage);

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        ISSUELOGSSDU: state.ISSUELOGSSDU
    };
};

// const mapDispatchToProps = dispatch => ({
//     saveIssueLog: (formValues,issueId,userId) => dispatch(saveIssueLog(formValues,issueId,userId))
// });

const mapDispatchToProps = {saveIssueLog};

export default connect(mapStateToProps, mapDispatchToProps)(newForm);