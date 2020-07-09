import React, {Component} from 'react';
import {Panel} from 'primereact/panel';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {AutoComplete} from 'primereact/autocomplete';

import _ from 'lodash';
import {connect} from 'react-redux';
import {assignedSupport} from "../redux/actions/IssuesActions";
import {getAllCategories} from "../redux/actions/CategoriesActions";

const MyStyle = {
    itemTemplateStyle: { fontSize: '16px', float: 'left', margin: '10px 10px 0 0' },
    divstyle: {paddingTop: "20px"},
    tooltipstyle: {position: 'top'},
    buttondivstyle: {paddingTop: "10px", paddingBottom: "35px"},
    buttonstyle: {marginRight: ".25em", float: "right", width: '145px'},
    widthStyle: {width: "100%"}
}

class AssignedSupport extends Component 
{
    state = {
        filteredCategories: null,        
        category:null,     
    }    

    componentDidMount() {
        this.props.getAllCategories();       
        this.categories = this.props.CATEGORIES;
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userID = this.props.LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
        const issueID = this.props.issueChooseId;       
        const values = {
            issueId: issueID,
            userId: userID,
            categoryName: this.state.category.toUpperCase()
        }
        this.props.assignedSupport(values);
    }   

    filterCategories =  (event) => {
        setTimeout(() => {
            let results;

            if (event.query.length === 0) {
                results = [...this.categories];
            }
            else {
                results = this.categories.filter((category) => {
                    return category.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState({ filteredCategories: results });
        }, 250);
    }

     itemTemplate = (category) => {
        return (
            <div className="p-clearfix">               
                <div style={MyStyle.itemTemplateStyle}>{category}</div>
            </div>
        );
    }

    render() {
        const userID = this.props.LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
        const issueID = this.props.issueChooseId;       
        return (
            <>             
                    <Panel header='Assigned Support'>
                        <Fieldset legend={`Support Details`}>
                            <div className='p-grid p-fluid'>
                                <div className='p-col-12 p-md-12' style={MyStyle.divstyle} >
                                    <span className="p-float-label">
                                        <InputText id="issueId"
                                            value={issueID}
                                            style={MyStyle.widthStyle}
                                            tooltip='Issue ID' tooltipOptions={MyStyle.tooltipstyle}
                                            readOnly />
                                        <label htmlFor="issueId">Issue ID</label>
                                    </span>
                                </div>

                                <div className='p-col-12 p-md-12' style={MyStyle.divstyle}>
                                    <span className="p-float-label">
                                        <InputText id="userId"
                                            value={userID}
                                            style={MyStyle.widthStyle}
                                            tooltip='User ID' tooltipOptions={MyStyle.tooltipstyle}
                                            readOnly />
                                        <label htmlFor="userId">User ID</label>
                                    </span>
                                </div>
                                <div className='p-col-12 p-md-12' style={MyStyle.divstyle}>
                                    <span className="p-float-label">
                                        <AutoComplete
                                            id="category"
                                            style={MyStyle.widthStyle}
                                            tooltip='Category' tooltipOptions={MyStyle.tooltipstyle}
                                            value={this.state.category}
                                            suggestions={this.state.filteredCategories}
                                            completeMethod={this.filterCategories} size={30} minLength={1}
                                            dropdown={true}
                                            itemTemplate={this.itemTemplate}
                                            onChange={(e) => this.setState({category: e.value})} />                                       
                                        <label htmlFor="category">Category</label>
                                    </span>                  
                                </div>
                            </div>
                        </Fieldset>
                        <div className='button'
                            style={MyStyle.buttondivstyle}>
                            <span>
                                <Button
                                    icon='pi pi-save'
                                    label='Assign Support'
                                    style={MyStyle.buttonstyle}
                                    disabled={_.isEmpty(issueID) ? true : false}
                                    onClick={this.onSubmit}
                                />
                            </span>
                        </div>
                    </Panel>
                
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        ISSUESSDU: state.ISSUESSDU,
        CATEGORIES: _.map(Object.values(state.CATEGORIES.categoriesResponse),"name")
    };
};

// const mapDispatchToProps = dispatch => ({
//     assignedSupport: (values) => dispatch(assignedSupport(values)),
//     getAllCategories: () => dispatch(getAllCategories())
// });
const mapDispatchToProps = {assignedSupport,getAllCategories}; 

export default connect(mapStateToProps, mapDispatchToProps)(AssignedSupport);