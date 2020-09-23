import {
    TICKET_GET_ALL_BY_ISSUEID,
    TICKET_GET_BY_ID,
    TICKET_SAVE,
    TICKET_UPDATE,
    TICKET_DELETE,
    TICKET_ERROR
} from '../constants/TicketConstants';
import _ from 'lodash';

const TicketsState = {
    ticketResponse: [],   
    fetchError: false,
    fetchErrorMessage: null
};

export const TICKETS = (state = TicketsState, action) => {
    switch (action.type) {
        case TICKET_GET_ALL_BY_ISSUEID:
            return {
                ...state,
                ticketResponse: _.mapKeys(action.payload, 'ticketId'),              
                fetchError: false,
                fetchErrorMessage: null

            };
        case TICKET_GET_BY_ID:
            return {
                ...state,
                ticketResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },             
                fetchError: false,
                fetchErrorMessage: null

            };
        case TICKET_SAVE:
            return {
                ...state,
                ticketResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },             
                fetchError: false,
                fetchErrorMessage: null

            };
        case TICKET_UPDATE:
            return {
                ...state,
                ticketResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },              
                fetchError: false,
                fetchErrorMessage: null

            };
        case TICKET_DELETE:
            return {
                ...state,
                ticketResponse: _.omit(state.ticketResponse, action.payload.ticketId),             
                fetchError: false,
                fetchErrorMessage: null
            };

        case TICKET_ERROR:
            return {
                ...state,
                ticketResponse: { ...state.ticketResponse },           
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



