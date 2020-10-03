import apiURL from '../config/ticketAPIURL';
import {    
    TicketError,
    TicketSave,
    TicketLoading,
    TicketReset,
    TicketGetAll,
    TicketGetAllByIssueId,
    // TicketGetByID
} from '../constants/TicketConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
    AllTicketsToastInfo,
    AllTicketsToastError,
    SaveTicketToastSuccess,
    SaveTicketToastError,
} from '../../components/toasts/ticketToasts';

export const getAllTickets = () => async (dispatch, getState) => {
    dispatch(showLoading('LOADINGBAR'));
    dispatch(TicketReset());
    dispatch(TicketLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;    
    await apiURL.get('/all', {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(TicketGetAll(data));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTicketsToastInfo);
        })
        .catch(function (error) {
            dispatch(TicketError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllTicketsToastError);
        })
};

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

export const saveTicket = (issueid) => async (dispatch, getState) => {
    dispatch(TicketLoading());
    dispatch(showLoading('LOADINGBAR'));
    let id = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;   
    //http://localhost:8080/itsystem/api/tickets/create/IIDGQuGSG1omH/d3jPjh8XVfqBAjEVuY1Kxgv8Aahkph/
    await apiURL.post(`/create/${issueid}/${id}`, null, {
        headers: {
            'Accept': 'application/json',
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



