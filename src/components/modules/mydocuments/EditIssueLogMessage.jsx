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

class EditIssueLogMessage extends Component {   
   
    render() {
        return (
            <div>               
               
                <Fieldset legend='Message Form'>
                  
                </Fieldset>
               
            </div>
        );
    }
}

export default EditIssueLogMessage;