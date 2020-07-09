import React, { Component } from "react";

import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import {Panel} from "primereact/panel";
import {Password} from 'primereact/password';

import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {required,passwordsMustMatch, minLength10} from './messages/errorFieldNotification';


class PasswordResetPage extends Component {
  
  componentDidMount() {
    // console.log(this.props);
  }

  renderPassword({ input, label, meta:{ touched, error, warning }}) {
    return (
            <div className='p-col-12 p-md-12' style={{ paddingTop: "20px" }}>
            <span className='p-float-label'>
              <Password {...input} />
              <label htmlFor='in'>{label}</label>
            </span>
            {touched && ((error && 
            <span>
              <div className="isa_error">
                  <i className="pi pi-times"></i>       
                  {error}            
              </div>
            </span>
                ) ||(warning && 
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

  onSubmit = (formValues) => {
    console.log(`FormValues : ${formValues}`);
  }

  render() {
    // const { id, token } = this.props.match.params;
    return (
      <div style={{ paddingTop: "20vh" }}>
        <div className='content-section implementation flexgrid-demo'>
          <div className='p-grid p-dir-col'>
            <div className='p-col-12 p-md-6 p-lg-6 p-col-align-center '>
              <div className='box'>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Panel header='Information Technology Support System'>
                  <Fieldset legend='Password Reset Form'>
                    <div className='p-grid p-fluid'>
                    <Field name="password" type="password" label="New Password" component={this.renderPassword} validate={minLength10}/>
                    <Field name="confirmedPassword" type="password" label="Confirmed Password" component={this.renderPassword} validate={[required,passwordsMustMatch]}/>
                    </div>
                  </Fieldset>
                  <div
                    className='button'
                    style={{ paddingTop: "10px", paddingBottom: "35px" }}>
                    <span>
                      <Button
                        label='Reset'
                        style={{ marginRight: ".25em", float: "right" }}
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
    );
  }
}

const passwordResetForm = reduxForm({
  form: 'passwordreset'
})(PasswordResetPage);

export default connect(null,null)(passwordResetForm);
