import React, {Component} from 'react';
import {Panel} from 'primereact/panel';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';

import {connect} from 'react-redux';
import {saveIssue} from "../redux/actions/IssuesActions";
import {Field, reduxForm} from 'redux-form';
import {maxLength150, minLength10} from './messages/errorFieldNotification';

class AddNewIssue extends Component {

  state = {}

  onSubmit = (formValues) => {
    const userId = this.props.LOGIN_AUTHENTICATION.loginState.loginResponse.userid;   
    this.props.saveIssue(formValues, userId); 
  }

  renderInput({input, label, meta: {touched, error, warning}})  {
    return (
      <div className='p-col-12 p-md-12' style={{paddingTop: "20px"}}>
        <span className="p-float-label">
          <InputText {...input} className={error ? `p-error` : undefined} id="in" style={{width: "100%"}} tooltip={label} tooltipOptions={{position: 'top'}} />
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
    )
  } 

  renderTextArea({input, label, meta: {touched, error, warning}}) {
    return (
      <div className='p-col-12 p-md-12' style={{paddingTop: "20px"}}>
        <span className="p-float-label">
          <InputTextarea
            {...input}
            className={error ? `p-error` : undefined}
            style={{width: "100%"}}
            rows={5} cols={30}
            tooltip={label}
            tooltipOptions={{position: 'top'}}
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
    )
  }

  render() {
    const userId = this.props.LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    return (
      <>       
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Panel header='New Issue'>           
            <Fieldset legend={`User ID : ${userId}`}>
              <div className='p-grid p-fluid'>
                <Field name="subject" label="Issue Subject" component={this.renderInput} validate={minLength10} />
                <Field name="description" label="Issue Description" component={this.renderTextArea} validate={[minLength10, maxLength150]} />
              </div>
            </Fieldset>
            <div className='button'
              style={{paddingTop: "10px", paddingBottom: "35px"}}>
              <span>
                <Button
                  icon='pi pi-save'
                  label='Save'
                  style={{marginRight: ".25em", float: "right", width: '100px'}}
                />
              </span>
            </div>
          </Panel>
        </form>
      </>
    );
  }
}

const newForm = reduxForm({
  form: 'addNewIssue'
})(AddNewIssue);

const mapStateToProps = state => {
  return {
    LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
    ISSUESSDU: state.ISSUESSDU
  };
};

const mapDispatchToProps = dispatch => ({
  saveIssue: (formValues, userId) => dispatch(saveIssue(formValues, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(newForm);