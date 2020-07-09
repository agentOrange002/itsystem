import apiURL from '../config/publicAPIURL';
import {        
        userimageget,
        userimagesubmit,
        userimageerror,
        reportissueerror,    
        reportissuesubmit,
        signup,
        signuperror
    } from '../constants/PublicConstants';

import {showLoading,hideLoading} from 'react-redux-loading-bar';
import { PublicReportIssueToastError,PublicReportIssueToastSuccess } from '../../components/toasts/publicToasts';
import {reset} from 'redux-form';

export const signupUser = (formValues) => async dispatch => {    
    dispatch(showLoading('signupBar'));    
    await apiURL.post('/signup/user',formValues)
    .then(function (response) {
        let data = response.data;
        console.log(response);
        dispatch(signup(data));
        dispatch(hideLoading('signupBar'));
    })
    .catch(function(error) {    
        dispatch(signuperror(error));
        dispatch(hideLoading('signupBar'));
    }) 
};

export const getUserImage = () => async dispatch => {
    dispatch(showLoading('userimagesubmitBar'));  
    await apiURL.get('/test/JHivcNsy7HLTexVlszCbRwfVNYEjCp')
    .then(function (response) {
        let data = response.data;       
        dispatch(userimageget(data));
        dispatch(hideLoading('userimagesubmitBar'));
    })
    .catch(function(error) {    
        dispatch(userimageerror(error));
        dispatch(hideLoading('userimagesubmitBar'));
    }) 
};

export const submitReportIssue = (formValues) => async dispatch => {
    dispatch(showLoading('reportissueBar'));  
    await apiURL.post('/post-issue', formValues)
    .then(function (response) {
        let data = response.data;       
        dispatch(reportissuesubmit(data));
        dispatch(hideLoading('reportissueBar'));
        dispatch(PublicReportIssueToastSuccess);
        dispatch(reset('reportIssue'));
    })
    .catch(function(error) {    
        dispatch(reportissueerror(error));
        dispatch(hideLoading('reportissueBar'));
        dispatch(PublicReportIssueToastError);
    }) 
};

export const submitUserImage = (param) => async dispatch => {
    dispatch(showLoading('userimagesubmitBar'));
    
    await apiURL.post('/test', param)
    .then(function (response) {
        let data = response.data;       
        dispatch(userimagesubmit(data));
        dispatch(hideLoading('userimagesubmitBar'));
    })
    .catch(function(error) {    
        dispatch(userimageerror(error));
        dispatch(hideLoading('userimagesubmitBar'));
    }) 
};

