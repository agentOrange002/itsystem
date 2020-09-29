import apiURL from '../config/issuesAPIURL';
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
import {
    AllIssuesToastInfo,
    AllIssuesToastError,
    GetIssueToastSuccess,
    GetIssueToastError,
    SaveIssueToastSuccess,
    SaveIssueToastError,
    UpdateIssueToastSuccess,
    UpdateIssueToastError,
    DeleteIssueToastSuccess,
    DeleteIssueToastError,
    AssignSupportToastSuccess,
    AssignSupportToastError,
    OwnedThisIssueToastSuccess,
    OwnedThisIssueToastError
} from '../../components/toasts/issueToasts';
//import history from "../../routes/history";

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
            dispatch(AllIssuesToastInfo);
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllIssuesToastError);
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
            dispatch(GetIssueToastSuccess);

        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(GetIssueToastError);
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
            dispatch(SaveIssueToastSuccess);
            dispatch(reset('addNewIssue'));
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(SaveIssueToastError);
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
            dispatch(UpdateIssueToastSuccess);
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(UpdateIssueToastError);
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
            dispatch(DeleteIssueToastSuccess);
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(DeleteIssueToastError);
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
            console.log(response);
            dispatch(IssuesAssignedSupport(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AssignSupportToastSuccess);
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AssignSupportToastError);
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
            console.log(response);
            dispatch(IssuesOwnedThisIssue(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(OwnedThisIssueToastSuccess);
        })
        .catch(function (error) {
            dispatch(IssuesError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(OwnedThisIssueToastError);
        })
};




