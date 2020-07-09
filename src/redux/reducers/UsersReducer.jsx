import _ from 'lodash';
import
{
  USER_ERROR,
  USER_GET_ALL,
  USER_GET_BY_ID,
  USER_SAVE,
  USER_UPDATE,
  USER_DELETE, 
} from '../constants/UsersConstants';

const UsersState = {
  usersResponse: [],
  fetchLoading: false,
  fetchError: false,
  fetchErrorMessage: null
};

export const USERS = (state = UsersState, action) =>
{
  switch (action.type)
  {
      case USER_GET_ALL:
          return {
              ...state,                
                  usersResponse: _.mapKeys(action.payload, 'userId'),
                  fetchLoading: false,
                  fetchError: false,
                  fetchErrorMessage: null
              
          };
      case USER_GET_BY_ID:
          return {
              ...state,              
                  userssResponse: {[action.payload.userId]: action.payload} ,
                  fetchLoading: false,
                  fetchError: false,
                  fetchErrorMessage: null
              
          };     
      case USER_SAVE:
          return {
              ...state,              
                  usersResponse: {...state.usersReponse, [action.payload.userId]: action.payload} ,
                  fetchLoading: false,
                  fetchError: false,
                  fetchErrorMessage: null
             
          };
      case USER_UPDATE:
          return {
              ...state,                
                usersResponse: {[action.payload.userId]: action.payload},
                  fetchLoading: false,
                  fetchError: false,
                  fetchErrorMessage: null
              
          };
      case USER_DELETE:
          return {
              ...state,               
                usersResponse: _.omit(state.usersReponse,action.payload.userId),
                  fetchLoading: false,
                  fetchError: false,
                  fetchErrorMessage: null                
          };
     
      case USER_ERROR:
          return {
              ...state,               
                usersResponse: {...state.usersReponse},
                  fetchLoading: false,
                  fetchError: true,
                  fetchErrorMessage: action.error               
          };
      default:
          return state;
  }
};





