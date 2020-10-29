import {ticketURL as apiURL} from '../config/ConfigURL';
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
import { ToastInfo,ToastSuccess,ToastError } from '../../components/toasts';
import _ from 'lodash';

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
            ToastInfo('All Ticket has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TicketError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
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
            ToastInfo('All Ticket has been loaded.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TicketError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
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
            ToastSuccess('Successfully save new ticket.');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(TicketError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};



