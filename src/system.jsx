import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'; 

// import ScrollToTop from './ScrollToTop';
import App from './App';
import PrivateRoute from './routes/privateroute';
import ReportIssuePage from './components/ReportIssuePage';
import SignupPage from './components/SignupPage';
import UserImagePage from './components/userimage';
import LoginPage from './components/LoginPage';
import PasswordResetPage from './components/PasswordResetPage';

class System extends Component {  
    render() { 
        return ( 
            <Switch>              
              <PrivateRoute path="/app/" component={App} authenticated={this.props.authentication}/>     
              <Route path="/login" component={LoginPage} />
              <Route path="/reportissue" component={ReportIssuePage} />       
              <Route path="/signup" component={SignupPage} />          
              <Route path="/userimage" component={UserImagePage} />     
              <Route path="/passwordreset/:id/:token" component={PasswordResetPage} />  
              <Redirect from="/" to="/login" />
            </Switch>     
         );
    }
}

const mapStateToProps = (state) => {
    return {     
      authentication: state.LOGIN_AUTHENTICATION.loginState.isAuthenticated
    };
}
  
export default connect(mapStateToProps,null)(System);