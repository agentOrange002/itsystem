import apiURL from '../config/issueLogsAPIURL';
import {
    IssueLogsError,
    IssueLogsSave,
    IssueLogsGetByIssueID
} from '../constants/IssueLogsConstants';
import {showLoading,hideLoading} from 'react-redux-loading-bar';
import {reset} from 'redux-form';
import {
    SaveIssueLogToastSuccess,
    SaveIssueLogToastError,
    GetIssueLogToastSuccess,
    GetIssueLogToastError,
} from '../../components/toasts/issuelogToasts';

export const saveIssueLog = (formValues,issueId,userId) => async  (dispatch,getState) => {    
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));   
    await apiURL.post(`/${issueId}/${userId}`,formValues,{headers:{
        'Content-Type':'application/json',
        'Authorization':token     
      }})
    .then(function (response) {
        let data = response.data;       
        dispatch(IssueLogsSave(data));
        dispatch(hideLoading('LOADINGBAR'));
        dispatch(SaveIssueLogToastSuccess);
        dispatch(reset('addNewIssueLog'));       
        
    })
    .catch(function(error) {    
        dispatch(IssueLogsError(error));
        dispatch(hideLoading('LOADINGBAR'));     
        dispatch(SaveIssueLogToastError);        
    }) 
};

export const getIssueLogByIssueID = (issueId) => async  (dispatch,getState) => {    
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));   
    await apiURL.get(`/${issueId}`,{headers:{
        'Content-Type':'application/json',
        'Authorization':token     
      }})
    .then(function (response) {
        let data = response.data;       
        dispatch(IssueLogsGetByIssueID(data));
        dispatch(hideLoading('LOADINGBAR'));        
       dispatch(GetIssueLogToastSuccess);
    })
    .catch(function(error) {    
        dispatch(IssueLogsError(error));
        dispatch(hideLoading('LOADINGBAR'));
        dispatch(GetIssueLogToastError);
    }) 
};



