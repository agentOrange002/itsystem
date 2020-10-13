import {loginURL as url, userURL as urlProfile } from '../config/ConfigURL';
import {
  LoginLogin,
  LoginError,
  LoginLoading,
  LoginProfileGet,
  LoginProfileError,
  LoginProfileUpdate,
  LoginProfileLoading,
  LoginProfileReset
} from "../constants/LoginConstants";
import history from "../../routes/history";
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import {
  LoginToast,
  ProfileToast,
  ProfileUpdateToast,
  ProfileErrorToast
} from '../../components/toasts/loginToasts';

export const LoginAuthentication = (formValues) => async dispatch => {
  dispatch(LoginLoading());
  dispatch(showLoading('loginBar'));
  await url.post("/login", formValues)
    .then(function (response) {
      let data = response.headers;
      dispatch(LoginLogin(data));
      dispatch(hideLoading('loginBar'));
      dispatch(LoginToast);
      history.push("/app/");
    })
    .catch(function (error) {
      dispatch(LoginError(error));
      dispatch(hideLoading('loginBar'));
    });
 
};

export const LoginProfile = () => async (dispatch, getState) => { 
  dispatch(LoginProfileLoading());
  let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
  let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization; 
  await urlProfile.get(`/${userid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(function (response) {
      let data = response.data;
      dispatch(LoginProfileGet(data));
      dispatch(ProfileToast);
    })
    .catch(function (error) {
      dispatch(LoginProfileError(error));
    });
};

export const ProfileUpdate = (values) => async (dispatch, getState) => {
  dispatch(LoginProfileReset());
  dispatch(LoginProfileLoading());
  dispatch(showLoading('LOADINGBAR'));
  let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
  let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
  await urlProfile.put(`/${userid}`, values, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(function (response) {
      let data = response.data;
      dispatch(LoginProfileUpdate(data));
      dispatch(hideLoading('LOADINGBAR'));
      dispatch(ProfileUpdateToast);
    })
    .catch(function (error) {
      dispatch(LoginProfileError(error));
      dispatch(hideLoading('LOADINGBAR'));
      dispatch(ProfileErrorToast);
    });
};
