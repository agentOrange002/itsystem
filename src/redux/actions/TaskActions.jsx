import {taskURL as apiURL} from '../config/ConfigURL';
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
import { ToastInfo,ToastSuccess,ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

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
            ToastInfo('All Task has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TaskError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
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
            ToastInfo('All Task has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TaskError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
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
            ToastInfo('All Task has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TaskError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};

export const saveTask = (formValues, tid) => async (dispatch, getState) => {
    dispatch(TaskLoading());
    let uid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post('/', {...formValues,ticketid:tid,userid:uid},{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TaskSave(data));
            dispatch(hideLoading('LOADINGBAR'));           
            dispatch(reset('addNewTask'));
            ToastSuccess('Successfully save new task.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TaskError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};



