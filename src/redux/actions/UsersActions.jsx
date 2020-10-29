import {userURL as apiURL,userimageURL as userimages_apiURL } from '../config/ConfigURL';
import {
    UserError,
    UserGetByID,
    UserGetAll,
    UserLoading,
    UserImageSubmit,
    UserImageError,
    UserImageLoading,
    UserImageUpdate
} from '../constants/UsersConstants';
import {showLoading,hideLoading} from 'react-redux-loading-bar';
import { ToastError, ToastInfo } from '../../components/toasts';
import _ from 'lodash';

export const getUserByID = (id) => async (dispatch, getState) => {
    dispatch(UserLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    await apiURL.get(`/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            console.log(response);
            dispatch(UserGetByID(data));
        })
        .catch(function (error) {
            let errorResponse = error;                 
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;               
            }
            dispatch(UserError(errorResponse));
        })
};

export const getAllUsers = () => async (dispatch, getState) => {
    dispatch(UserLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    await apiURL.get('/all', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(UserGetAll(data));
            ToastInfo('All User has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(UserError(errorResponse));
            ToastError(errorMessage);
        })
};

export const submitUserImage = (param) => async (dispatch,getState) => {
    dispatch(UserImageLoading()); 
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    dispatch(showLoading('LOADINGBAR'));
    await userimages_apiURL.post(`/${userid}`, param, {
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageSubmit(data));
            dispatch(hideLoading('LOADINGBAR'));
        })
        .catch(function (error) {
            let errorResponse = error;       
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
            }
            dispatch(UserImageError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
        })
};

export const updateUserImage = (param) => async (dispatch,getState) => {
    dispatch(UserImageLoading()); 
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    dispatch(showLoading('LOADINGBAR'));
    await userimages_apiURL.put(`/${userid}`, param, {
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageUpdate(data));
            dispatch(hideLoading('LOADINGBAR'));
        })
        .catch(function (error) {
            let errorResponse = error;    
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
            }
            dispatch(UserImageError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
        })
};
