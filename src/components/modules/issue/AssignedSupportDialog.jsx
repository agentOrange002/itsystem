import React, { Component } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/UsersActions';
import { assignedSupport } from "../../../redux/actions/IssuesActions";
import { getAllCategories } from "../../../redux/actions/CategoriesActions";

const MyStyle = {
    AutoComplete: {
        AutoComplete: { width: "100%" },
        Div: { paddingTop: "20px" },
        Tooltip: { position: 'top' }
    },
    itemTemplateStyle: { fontSize: '16px', float: 'left', margin: '10px 10px 0 0' },
    ButtonClass: { paddingTop: "10px", paddingBottom: "35px" },
    ButtonStyle: { marginRight: ".25em", float: "right", width: '180px' }
}

class AssignedSupportDialog extends Component {
    state = {
        filteredCategories: null,
        filteredUsers: null,
        category: null,
        user: null      
    }

    componentDidMount() {
        if (_.isEmpty(this.props.CATEGORIES)) {
            this.props.getAllCategories();
        }
        if (_.isEmpty(this.props.USERS)) {
            this.props.getAllUsers();
        }

        this.categories = this.props.CATEGORIES;
        this.users = this.props.USERS;
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let userid = this.props.USERSELECTED[this.state.user].userId;
        const values = {
            issueId: this.props.onselectedIssue.issueId,
            userId: userid,
            categoryName: this.state.category
        }  
        await this.props.assignedSupport(values);
        await this.props.hidethis();
    }

    filterCategories = (event) => {
        setTimeout(() => {
            let results;

            if (event.query.length === 0) {
                results = [...this.categories];
            }
            else {
                results = this.categories.filter((category) => {
                    return category.toUpperCase().startsWith(event.query.toUpperCase());
                });
            }
            this.setState({ filteredCategories: results });
        }, 250);
    }

    filterUsers = (event) => {
        setTimeout(() => {
            let results;
            if (event.query.length === 0) {
                results = [...this.users];
            }
            else {
                results = this.users.filter((user) => {
                    // return user.toLowerCase().startsWith(event.query.toLowerCase());
                    return user;
                });
            }
            this.setState({ filteredUsers: results });
        }, 250);
    }

    itemCategoryTemplate = (category) => {
        return (
            <div className="p-clearfix">
                <div style={MyStyle.itemTemplateStyle}>{category}</div>
            </div>
        );
    }

    // itemUserTemplate = (user) => {            
    //     let userid = this.props.USERSELECTED[user].userId;
    //     return (

    //         this.setState({selectedUserId: userid});
    //         <div className="p-clearfix">
    //             <div style={MyStyle.itemTemplateStyle}>{user} - {userid} </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div>
                <Fieldset legend='Please fill up'>
                    <div className='p-col-12 p-md-12' style={MyStyle.AutoComplete.Div}>
                        <span className="p-float-label">
                            <AutoComplete
                                id="category"
                                style={MyStyle.AutoComplete.AutoComplete}
                                tooltip='Category' tooltipOptions={MyStyle.AutoComplete.Tooltip}
                                value={this.state.category}
                                suggestions={this.state.filteredCategories}
                                completeMethod={this.filterCategories} size={30} minLength={1}
                                dropdown={true}
                                itemTemplate={this.itemCategoryTemplate}
                                onChange={(e) => this.setState({ category: e.value })} />
                            <label htmlFor="category">Category</label>
                        </span>
                    </div>
                    <div className='p-col-12 p-md-12' style={MyStyle.AutoComplete.Div}>
                        <span className="p-float-label">
                            <AutoComplete
                                id="user"
                                style={MyStyle.AutoComplete.AutoComplete}
                                tooltip='User' tooltipOptions={MyStyle.AutoComplete.Tooltip}
                                value={this.state.user}
                                suggestions={this.state.filteredUsers}
                                completeMethod={this.filterUsers} size={30} minLength={1}
                                dropdown={true}
                                //itemTemplate={this.itemUserTemplate}
                                onChange={(e) => this.setState({ user: e.value })} />
                            <label htmlFor="user">User</label>
                        </span>
                    </div>
                </Fieldset>
                <div className='button' style={MyStyle.ButtonClass}>
                    <span>
                        <Button
                            icon='pi pi-plus'
                            label='Assigned Support'
                            style={MyStyle.ButtonStyle}
                            onClick={this.onSubmit}
                            disabled={!this.state.user||this.state.category === null ? true : false}
                        />
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION,
        CATEGORIES: _.map(Object.values(state.CATEGORIES.categoriesResponse), "name"),      
        USERS: _.map(Object.values(state.USERS.usersResponse), "fullName"),
        USERSELECTED: _.mapKeys(Object.values(state.USERS.usersResponse), "fullName")
    };
};

const mapDispatchToProps = { assignedSupport, getAllUsers, getAllCategories };

export default connect(mapStateToProps, mapDispatchToProps)(AssignedSupportDialog);
