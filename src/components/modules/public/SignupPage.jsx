import React, { Component } from "react";
import {Field,reduxForm} from 'redux-form';
import {errorEmail, warningAol, passwordsMustMatch, minLength10, required} from '../../messages/errorFieldNotification';
import {connect} from "react-redux";
import {signupUser} from "../../../redux/actions/PublicActions";
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import {Password} from 'primereact/password';
import HeaderProgressBar from '../../modules/tools/HeaderProgressBar';

class SignupPage extends Component {

  onSubmit = (formValues) => { 
    // this.props.signupUser(formValues)
  }

  renderInput({input, label, meta: { touched, error, warning }}) {
      return(
        <div className='p-col-12 p-md-6' style={{ paddingTop: "20px" }}>
          <span className='p-float-label'>
            <InputText {...input}/>
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

  renderEmail({input, label, meta: { touched, error, warning }}) {
      return(
        <div className='p-col-12 p-md-12' style={{ paddingTop: "20px" }}>
          <span className='p-float-label'>
            <InputText {...input} />
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

  renderPassword({input, label, meta: { touched, error, warning }}) {
    return(
      <div className='p-col-12 p-md-6' style={{ paddingTop: "20px" }}>
        <span className='p-float-label'>
          <Password {...input}/>
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

  render() {    
    return (
      <div style={{paddingTop:'20vh'}}>
        <HeaderProgressBar nameofbar={"signupBar"} />
      
        <div className='content-section implementation flexgrid-demo'>
          <div className='p-grid p-dir-col'>
            
            <div className='p-col-12 p-md-12 p-lg-8 p-col-align-center '>
              <div className='box' >
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Panel header='Signup Form' >
                  <Fieldset legend='Please Fill Up'>
                    <div className='p-grid p-fluid'>
                    <Field name="firstname" label="First Name" component={this.renderInput} validate={minLength10}/>
                    <Field name="lastname" label="Last Name" component={this.renderInput} validate={minLength10}/>
                    <Field name="email" type="email" label="E-mail Address" component={this.renderEmail} validate={errorEmail}  warn={warningAol} />                      
                    <Field name="password" type="password" label="Password" component={this.renderPassword} validate={minLength10}/>
                    <Field name="confirmedpassword" type="password" label="Confirmed Password" component={this.renderPassword} validate={[required,passwordsMustMatch]}/>
                    </div>                     
                  </Fieldset>     
                  <div className='button' style={{ paddingTop:'10px',paddingBottom: "35px" }} >
                    <span>
                      <Button label='Register'style={{ marginRight: ".25em", float: "right" }}/>
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

const signupForm = reduxForm({
  form: 'signup'
})(SignupPage);

const mapStateToProps = state => {
  return {
    USERSSDA: state.USERSSDA
  };
};

const mapDispatchToProps = dispatch => ({
  signupUser: (formValues) => dispatch(signupUser(formValues))
});

export default connect(mapStateToProps,mapDispatchToProps)(signupForm);
