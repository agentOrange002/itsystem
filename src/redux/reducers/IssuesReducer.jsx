import {
  ISSUES_ERROR,
  ISSUES_GET_ALL,
  ISSUES_GET_BY_ID,
  ISSUES_SAVE,
  ISSUES_UPDATE,
  ISSUES_DELETE,
  ISSUES_ASSIGNED_SUPPORT,
  ISSUES_OWNED_THIS_ISSUE,
  ISSUES_RESET
} from '../constants/IssuesConstants';

import _ from 'lodash';

const IssuesState = {
  issuesResponse: [],
  fetchError: false,
  fetchErrorMessage: null
};

export const ISSUES = (state = IssuesState, action) => {
  switch (action.type) {
    case ISSUES_RESET:
      return {
        ...state,
        issuesResponse: [],       
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_GET_ALL:
      return {
        ...state,
        issuesResponse: _.mapKeys(action.payload, "issueId"),      
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_GET_BY_ID:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse, [action.payload.issueId]: action.payload },       
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_SAVE:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse, [action.payload.issueId]: action.payload },      
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_ASSIGNED_SUPPORT:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse, [action.payload.issueId]: action.payload },    
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_OWNED_THIS_ISSUE:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse, [action.payload.issueId]: action.payload },      
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_UPDATE:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse, [action.payload.issueId]: action.payload },      
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_DELETE:
      return {
        ...state,
        issuesResponse: _.omit(state.categoriesResponse, action.payload.issueId),      
        fetchError: false,
        fetchErrorMessage: null
      };
    case ISSUES_ERROR:
      return {
        ...state,
        issuesResponse: { ...state.issuesResponse },       
        fetchError: true,
        fetchErrorMessage: action.error
      };
    default:
      return state;
  }
};




