import {
    TICKET_GET_ALL_BY_ISSUEID,
    TICKET_GET_ALL,
    TICKET_GET_BY_ID,
    TICKET_SAVE,
    TICKET_UPDATE,
    TICKET_DELETE,
    TICKET_ERROR,
    TICKET_RESET,
} from '../constants/TicketConstants';
import _ from 'lodash';

const TicketsState = {
    ticketsResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const TICKETS = (state = TicketsState, action) => {
    switch (action.type) {
        case TICKET_RESET:
            return {
                ...state,
                ticketsResponse: [],
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_GET_ALL:
            return {
                ...state,
                ticketsResponse: _.mapKeys(action.payload, 'ticketId'),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_GET_ALL_BY_ISSUEID:
            return {
                ...state,
                ticketsResponse: _.mapKeys(action.payload, 'ticketId'),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_GET_BY_ID:
            return {
                ...state,
                ticketsResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_SAVE:
            return {
                ...state,
                ticketsResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_UPDATE:
            return {
                ...state,
                ticketsResponse: { ...state.ticketResponse, [action.payload.ticketId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_DELETE:
            return {
                ...state,
                ticketsResponse: _.omit(state.ticketResponse, action.payload.ticketId),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TICKET_ERROR:
            return {
                ...state,
                ticketsResponse: { ...state.ticketResponse },
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



