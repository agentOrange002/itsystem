import {issueURL as apiURL} from '../config/ConfigURL';
import {
    IssuesError,
    IssuesGetAll,
    IssuesGetById,
    IssuesSave,
    IssuesUpdate,
    IssuesDelete,
    IssuesAssignedSupport,
    IssuesOwnedThisIssue,
    IssuesLoading,
    IssuesReset
} from '../constants/IssuesConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { reset } from 'redux-form';
import { ToastInfo,ToastSuccess,ToastError } from '../../components/toasts';
import _ from 'lodash';

export const getAllIssues = () => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesReset());
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get('/all', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(IssuesGetAll(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastInfo('Issues has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const getIssuesById = (id) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(IssuesGetById(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully get issue by id');

        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const saveIssue = (formValues, userId) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${userId}`, formValues, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            console.log(response);
            dispatch(IssuesSave(data));
            dispatch(hideLoading('LOADINGBAR'));
           
            dispatch(reset('addNewIssue'));
           ToastSuccess('Successfully save new issue.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const updateIssue = (formValues, id) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${id}`, formValues, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            console.log(response);
            dispatch(IssuesUpdate(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully update the issue.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const deleteIssue = (formValues, id) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${id}`, formValues, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            console.log(response);
            dispatch(IssuesDelete(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully delete the issue.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const assignedSupport = (values) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;  
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.put(`/assignedsupport`, values, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;           
            dispatch(IssuesAssignedSupport(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully assigned a support to this issue.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const ownedThisIssue = (issueid, userId) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(IssuesLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.put(`/ownedthisissue/${issueid}/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;          
            dispatch(IssuesOwnedThisIssue(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully owned this issue.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(IssuesError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};




