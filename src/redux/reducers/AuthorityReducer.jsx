import {
    AUTHORITY_ERROR,
    AUTHORITY_GET_ALL,
    AUTHORITY_GET_BY_ID,
    AUTHORITY_GET_BY_USERID,
    AUTHORITY_SAVE,
    AUTHORITY_UPDATE,
    AUTHORITY_DELETE,
    AUTHORITY_RESET
} from '../constants/AuthorityConstants';
import _ from 'lodash';

const AuthoritiesState = {
    authoritiesResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const AUTHORITIES = (state = AuthoritiesState, action) => {
    switch (action.type) {
        case AUTHORITY_RESET:
            return {
                ...state,
                authoritiesResponse: [],
                fetchError: false,
                fetchErrorMessage: null
            };
        case AUTHORITY_GET_ALL:
            return {
                ...state,
                authoritiesResponse: _.mapKeys(action.payload, 'authorityId'),
                fetchError: false,
                fetchErrorMessage: null

            };
        case AUTHORITY_GET_BY_USERID:
            return {
                ...state,
                authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case AUTHORITY_GET_BY_ID:
            return {
                ...state,
                authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case AUTHORITY_SAVE:
            return {
                ...state,
                authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case AUTHORITY_UPDATE:
            return {
                ...state,
                authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case AUTHORITY_DELETE:
            return {
                ...state,
                authoritiesResponse: _.omit(state.authoritiesResponse, action.payload.id),
                fetchError: false,
                fetchErrorMessage: null
            };
        case AUTHORITY_ERROR:
            return {
                ...state,
                authoritiesResponse: { ...state.authoritiesResponse },
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



