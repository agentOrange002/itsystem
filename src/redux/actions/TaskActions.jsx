import apiURL from '../config/taskAPIURL';
import {    
    TaskError,
    TaskSave,
    TaskLoading,
    TaskReset,
    TaskGetAll,
    TaskGetAllByIssueId,
    TaskGetAllByTicketId
    // TaskGetByID
} from '../constants/TaskConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
    AllTasksToastInfo,
    AllTasksToastError,
    SaveTaskToastSuccess,
    SaveTaskToastError,
} from '../../components/toasts/taskToasts';

export const getAllTasks = () => async (dispatch, getState) => {
    dispatch(showLoading('LOADINGBAR'));
    dispatch(TaskReset());
    dispatch(TaskLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;    
    await apiURL.get('/all', {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TaskGetAll(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastInfo);
        })
        .catch(function (error) {
            dispatch(TaskError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastError);
        })
};

export const getAllTasksByIssueId = (issueId) => async (dispatch, getState) => {
    dispatch(TaskLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/all/issue/${issueId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TaskGetAllByIssueId(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastInfo);
        })
        .catch(function (error) {
            dispatch(TaskError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastError);
        })
};

export const getAllTasksByTicketId = (ticketid) => async (dispatch, getState) => {
    dispatch(TaskLoading());
    dispatch(TaskReset());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/all/ticket/${ticketid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TaskGetAllByTicketId(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastInfo);
        })
        .catch(function (error) {
            dispatch(TaskError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTasksToastError);
        })
};

export const saveTask = (issueId) => async (dispatch, getState) => {
    dispatch(TaskLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${issueId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TaskSave(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(SaveTaskToastSuccess);
        })
        .catch(function (error) {
            dispatch(TaskError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(SaveTaskToastError);
        })
};



