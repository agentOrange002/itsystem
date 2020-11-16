import {
    MYDOCUMENT_ERROR,
    MYDOCUMENT_GET_ALL,
    MYDOCUMENT_GET_BY_ID,
    MYDOCUMENT_SAVE,
    MYDOCUMENT_UPDATE,
    MYDOCUMENT_DELETE,
    MYDOCUMENT_RESET
} from '../constants/MyDocumentConstants';
import _ from 'lodash';

const MyDocumentsState = {
    mydocumentResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const MYDOCUMENTS = (state = MyDocumentsState, action) => {
    switch (action.type) {
        case MYDOCUMENT_RESET:
            return {
                ...state,
                mydocumentResponse: [],
                fetchError: false,
                fetchErrorMessage: null
            };
        case MYDOCUMENT_GET_ALL:
            return {
                ...state,
                mydocumentResponse: _.mapKeys(action.payload, 'issueId'),
                fetchError: false,
                fetchErrorMessage: null

            };
        case MYDOCUMENT_GET_BY_ID:
            return {
                ...state,
                mydocumentResponse: { ...state.mydocumentResponse, [action.payload.issueId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case MYDOCUMENT_SAVE:
            return {
                ...state,
                mydocumentResponse: { ...state.mydocumentResponse, [action.payload.issueId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case MYDOCUMENT_UPDATE:
            return {
                ...state,
                mydocumentResponse: { ...state.mydocumentResponse, [action.payload.issueId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null

            };
        case MYDOCUMENT_DELETE:
            return {
                ...state,
                mydocumentResponse: _.omit(state.mydocumentResponse, action.payload.issueId),
                fetchError: false,
                fetchErrorMessage: null
            };
        case MYDOCUMENT_ERROR:
            return {
                ...state,
                mydocumentResponse: { ...state.mydocumentResponse },
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



