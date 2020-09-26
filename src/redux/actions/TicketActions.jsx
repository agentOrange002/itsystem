import apiURL from '../config/ticketAPIURL';
import {
    TicketGetAllByIssueId,
    TicketError,
    TicketSave,
    TicketLoading,
    //TicketReset
    // TicketGetByID
} from '../constants/TicketConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
//import {reset} from 'redux-form';

import {
    AllTicketsToastInfo,
    AllTicketsToastError,
    SaveTicketToastSuccess,
    SaveTicketToastError,
} from '../../components/toasts/ticketToasts';

export const getAllTicketsByIssueId = (issueId) => async (dispatch, getState) => {
    dispatch(TicketLoading());
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
            dispatch(TicketGetAllByIssueId(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTicketsToastInfo);
        })
        .catch(function (error) {
            dispatch(TicketError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTicketsToastError);
        })
};

export const saveTicket = (issueId) => async (dispatch, getState) => {
    dispatch(TicketLoading());
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
            dispatch(TicketSave(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(SaveTicketToastSuccess);
        })
        .catch(function (error) {
            dispatch(TicketError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(SaveTicketToastError);
        })
};



