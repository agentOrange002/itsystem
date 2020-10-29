import {publicURL as apiURL} from '../config/ConfigURL';
import {  
    ReportIssueError,
    ReportIssueSubmit,
    ReportIssueLoading,
    ReportIssueReset,
    UserSignup,
    UserSignupError,
    UserSignupLoading,
    UserSignupReset
} from '../constants/PublicConstants';

import {  UserImageGet,
    UserImageSubmit,
    UserImageError,
    UserImageLoading,
    UserImageReset, } from '../constants/UsersConstants';

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { PublicReportIssueToastError, PublicReportIssueToastSuccess } from '../../components/toasts/publicToasts';
import { reset } from 'redux-form';
//import _ from 'lodash';

export const signupUser = (formValues) => async dispatch => {
    dispatch(UserSignupReset());
    dispatch(UserSignupLoading())
    dispatch(showLoading('signupBar'));
    await apiURL.post('/signup/user', formValues)
        .then(function (response) {
            let data = response.data;
            console.log(response);
            dispatch(UserSignup(data));
            dispatch(hideLoading('signupBar'));
        })
        .catch(function (error) {
            dispatch(UserSignupError(error));
            dispatch(hideLoading('signupBar'));
        })
};

export const getUserImage = () => async dispatch => {
    dispatch(UserImageReset());
    dispatch(UserImageLoading());
    dispatch(showLoading('userimagesubmitBar'));
    await apiURL.get('/test/d3jPjh8XVfqBAjEVuY1Kxgv8Aahkph')
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageGet(data));
            dispatch(hideLoading('userimagesubmitBar'));
        })
        .catch(function (error) {
            dispatch(UserImageError(error));
            dispatch(hideLoading('userimagesubmitBar'));
        })
};

export const submitReportIssue = (formValues) => async dispatch => {
    dispatch(ReportIssueReset());
    dispatch(ReportIssueLoading());
    dispatch(showLoading('reportissueBar'));
    await apiURL.post('/post-issue', formValues)
        .then(function (response) {
            let data = response.data;
            dispatch(ReportIssueSubmit(data));
            dispatch(hideLoading('reportissueBar'));
            dispatch(PublicReportIssueToastSuccess);
            dispatch(reset('reportIssue'));
        })
        .catch(function (error) {
            dispatch(ReportIssueError(error));
            dispatch(hideLoading('reportissueBar'));
            dispatch(PublicReportIssueToastError);
        })
};

export const submitUserImage = (param) => async dispatch => {
    dispatch(UserImageLoading());
    dispatch(showLoading('userimagesubmitBar'));
    await apiURL.post('/test', param)
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageSubmit(data));
            dispatch(hideLoading('userimagesubmitBar'));
        })
        .catch(function (error) {
            dispatch(UserImageError(error));
            dispatch(hideLoading('userimagesubmitBar'));
        })
};

