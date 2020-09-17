import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Fieldset} from 'primereact/fieldset';
import {connect} from 'react-redux';
import {saveCategory} from '../../../redux/actions/CategoriesActions';
import {Field, reduxForm} from 'redux-form';
import {maxLength150, minLength10} from '../../messages/errorFieldNotification';

class AddNewCategory extends Component {
    
    state = {  }

    renderTextInput=({input, label, meta: {touched, error, warning}})=>{
        return (
            <div className='p-col-12 p-md-12'>
                <span className="p-float-label">
                    <InputText id="category"       
                        {...input}                
                        style={{width: "100%"}}
                        tooltip='Issue ID' tooltipOptions={{position: 'top'}}
                        />
                    <label htmlFor="category">{label}</label>
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

   

    onSubmit = (formValues) => {
       this.props.saveCategory(formValues);
    }

    render() {      
        return ( 
            <div>            
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Fieldset legend='Category Form'>
                    <Field name="name" label="Category Name" component={this.renderTextInput} validate={[minLength10, maxLength150]} />
                </Fieldset>
                <div className='button'
                    style={{paddingTop: "10px", paddingBottom: "35px"}}>
                    <span>
                        <Button
                            icon='pi pi-save'
                            label='Add Category'
                            style={{marginRight: ".25em", float: "right", width: '150px'}}
                        />
                    </span>
                </div>
            </form>
        </div>
         );
    }
}

const newForm = reduxForm({
    form: 'addNewCategory'
})(AddNewCategory);
 
const mapStateToProps = state => {
    return {
        CATEGORIES: Object.values(state.CATEGORIES.categoriesResponse)
    };
};


const mapDispatchToProps = dispatch => ({  
    saveCategory: (formValues) => dispatch(saveCategory(formValues))
});


export default connect(mapStateToProps, mapDispatchToProps)(newForm);