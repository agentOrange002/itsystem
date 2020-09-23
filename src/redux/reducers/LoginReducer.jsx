import {
  LOGIN_LOGIN,
  LOGIN_ERROR,
  LOGIN_PROFILE_ERROR,
  LOGIN_PROFILE_GET,
  LOGIN_PROFILE_UPDATE
} from '../constants/LoginConstants';

const loginState = {
  loginResponse: [],
  isAuthenticated: false,
  fetchLoading: false,
  fetchError: false,
  fetchErrorMessage: null
};

const profileState = {
  profileResponse: [], 
  fetchError: false,
  fetchErrorMessage: null
};

export const LOGIN_AUTHENTICATION = (state = { loginState }, action) => {
  switch (action.type) {
    case LOGIN_LOGIN:
      return {
        ...state,
        loginState: {
          loginResponse: action.payload,
          isAuthenticated: true,
          fetchLoading: false,
          fetchError: false,
          fetchErrorMessage: null
        }
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginState: {
          loginResponse: [],
          isAuthenticated: false,
          fetchLoading: false,
          fetchError: true,
          fetchErrorMessage: action.error
        }
      };
    default:
      return state;
  }
};

export const LOGIN_PROFILE = (state = { profileState }, action) => {
  switch (action.type) {
    case LOGIN_PROFILE_GET:
      return {
        ...state,
        profileState: {
          profileResponse: action.payload,        
          fetchError: false,
          fetchErrorMessage: null
        }
      };
    case LOGIN_PROFILE_UPDATE:
      return {
        ...state,
        profileState: {
          profileResponse: action.payload,          
          fetchError: false,
          fetchErrorMessage: null
        }
      };
    case LOGIN_PROFILE_ERROR:
      return {
        ...state,
        profileState: {
          profileResponse: {...state.profileState.profileResponse},        
          fetchError: true,
          fetchErrorMessage: action.error
        }
      };
    default:
      return state;
  }
};

