import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import _ from 'lodash';

const atype = ['IssueMaintenance', 'IssueDetails', 'Dashboard', 'TicketMaintenance','TaskMaintenance'];

const checkComponentName = (name, atype, auth) => {
    let result = false;
    if (auth) {
        if (_.includes(atype, name)) {
            // console.log(name +" check component: true");
            result = true;
        }
    }
    return result;
}

const AuthorizedRoute = props => {
    const { component: Component, LOGIN_AUTHENTICATION, checkName, ...rest } = props;
    return <Route
        {...rest}
        render={(props) => (
            checkComponentName(checkName, atype, LOGIN_AUTHENTICATION.loginState.isAuthenticated) ? <Component {...props} /> : <Redirect to='/app/unauthorized401' />
        )
        } />
}

// const JimRoute = connect(state => ({
//     LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION
// }))(_JimRoute);

const mapStateToProps = state => {
    return {
        LOGIN_AUTHENTICATION: state.LOGIN_AUTHENTICATION
    };
};

export default connect(mapStateToProps, null)(AuthorizedRoute);