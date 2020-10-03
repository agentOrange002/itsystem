import apiURL from '../config/usersAPIURL';
import userimages_apiURL from '../config/userimagesAPIURL';
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
import {
    GetAllUsersToastSuccess,
    GetAllUsersToastError,
} from '../../components/toasts/userToasts';

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
            dispatch(UserError(error));
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
            dispatch(GetAllUsersToastSuccess);
        })
        .catch(function (error) {
            dispatch(UserError(error));
            dispatch(GetAllUsersToastError);
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
            dispatch(UserImageError(error));
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
            dispatch(UserImageError(error));
            dispatch(hideLoading('LOADINGBAR'));
        })
};
