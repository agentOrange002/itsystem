import {
     MDISSUELOGS_GET_ALL,
     MDISSUELOGS_ERROR,
     MDISSUELOGS_SAVE,
     MDISSUELOGS_UPDATE,
     MDISSUELOGS_DELETE,
     MDISSUELOGS_GET_BY_ID,
     MDISSUELOGS_GET_BY_ISSUEID,
     MDISSUELOGS_RESET
   } from '../constants/MDIssueLogConstants';
   import _ from 'lodash';
   
   const MDIssueLogsState = {
     mdIssueLogsResponse: [],
     fetchError: false,
     fetchErrorMessage: null
   };
   
   export const MDISSUELOGS = (state = MDIssueLogsState, action) => {
     switch (action.type) {
       case MDISSUELOGS_RESET:
         return {
           ...state,
           mdIssueLogsResponse: [],
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_GET_ALL:
         return {
           ...state,
           mdIssueLogsResponse: action.payload,
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_GET_BY_ID:
         return {
           ...state,
           mdIssueLogsResponse: { ...state.mdIssueLogsResponse, [action.payload.issueLogId]: action.payload },
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_GET_BY_ISSUEID:
         return {
           ...state,
           mdIssueLogsResponse: _.mapKeys(action.payload, 'issueLogId'),
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_SAVE:
         return {
           ...state,
           mdIssueLogsResponse: { ...state.mdIssueLogsResponse, [action.payload.issueLogId]: action.payload },
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_UPDATE:
         return {
           ...state,
           mdIssueLogsResponse: action.payload,
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_DELETE:
         return {
           ...state,
           mdIssueLogsResponse: action.payload,
           fetchError: false,
           fetchErrorMessage: null
         };
       case MDISSUELOGS_ERROR:
         return {
           ...state,
           mdIssueLogsResponse: { ...state.mdIssueLogsResponse },
           fetchError: true,
           fetchErrorMessage: action.error
         };
       default:
         return state;
     }
   };
   
   
   
   