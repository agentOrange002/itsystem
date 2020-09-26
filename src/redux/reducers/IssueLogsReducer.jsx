import {
  ISSUELOGS_GET_ALL,
  ISSUELOGS_ERROR,
  ISSUELOGS_SAVE,
  ISSUELOGS_UPDATE,
  ISSUELOGS_DELETE,
  ISSUELOGS_GET_BY_ID,
  ISSUELOGS_GET_BY_ISSUEID,
  ISSUELOGS_RESET
} from '../constants/IssueLogsConstants';
import _ from 'lodash';

const IssueLogsState = {
  issueLogsResponse: [],
  fetchError: false,
  fetchErrorMessage: null
};

export const ISSUELOGS = (state = IssueLogsState, action) => {
  switch (action.type) {
    case ISSUELOGS_RESET:
      return {
        ...state,
        issueLogsResponse: [],
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_GET_ALL:
      return {
        ...state,
        issueLogsResponse: action.payload,
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_GET_BY_ID:
      return {
        ...state,
        issueLogsResponse: { ...state.issueLogsResponse, [action.payload.issueLogId]: action.payload },
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_GET_BY_ISSUEID:
      return {
        ...state,
        issueLogsResponse: _.mapKeys(action.payload, 'issueLogId'),
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_SAVE:
      return {
        ...state,
        issueLogsResponse: { ...state.issueLogsResponse, [action.payload.issueLogId]: action.payload },
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_UPDATE:
      return {
        ...state,
        issueLogsResponse: action.payload,
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_DELETE:
      return {
        ...state,
        issueLogsResponse: action.payload,
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUELOGS_ERROR:
      return {
        ...state,
        issueLogsResponse: { ...state.issueLogsResponse },
        fetchError: true,
        fetchErrorMessage: action.error
      };
    default:
      return state;
  }
};



