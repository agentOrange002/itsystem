import apiURL from '../config/usersAPIURL';
import {
    UserError,
    UserGetByID,
    UserGetAll,
    UserLoading
} from '../constants/UsersConstants';
//import {showLoading,hideLoading} from 'react-redux-loading-bar';
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
