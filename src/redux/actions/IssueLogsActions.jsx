import {issuelogURL as apiURL} from '../config/ConfigURL';
import {
    IssueLogsError,
    IssueLogsSave,
    IssueLogsGetByIssueID,
    IssueLogsReset,
    IssueLogsLoading
} from '../constants/IssueLogsConstants';

import {
    MDIssueLogsError,
    MDIssueLogsGetByIssueID,
    MDIssueLogsReset,
    MDIssueLogsLoading
} from '../constants/MDIssueLogConstants';

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { reset } from 'redux-form';
import { ToastInfo,ToastSuccess,ToastError } from '../../components/toasts';
import _ from 'lodash';

export const saveIssueLog = (formValues, issueId, userId) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssueLogsLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${issueId}/${userId}`, formValues, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(IssueLogsSave(data));
            dispatch(hideLoading('LOADINGBAR'));            
            dispatch(reset('addNewIssueLog'));
            ToastSuccess('Successfully save new log!');

        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssueLogsError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const getIssueLogByIssueID = (issueId) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssueLogsLoading());
    dispatch(IssueLogsReset());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/${issueId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(IssueLogsGetByIssueID(data));
            dispatch(hideLoading('LOADINGBAR'));
           ToastInfo('Issue log has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssueLogsError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const getMDIssueLogByIssueID = (issueId) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(MDIssueLogsLoading());
    dispatch(MDIssueLogsReset());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/${issueId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(MDIssueLogsGetByIssueID(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastInfo('MyDocument Issue log has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(MDIssueLogsError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};


