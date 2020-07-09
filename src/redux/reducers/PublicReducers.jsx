import
{
    USER_IMAGE_GET, 
    USER_IMAGE_SUBMIT,
    USER_IMAGE_ERROR,
    USER_SIGNUP,
    USER_ERROR,
    REPORT_ISSUE_SUBMIT,
    REPORT_ISSUE_ERROR,
    
   

} from '../constants/PublicConstants';

import {USERS_SIGNUP, USERS_ERROR} from '../constants/UsersConstants';

const getuserimageState = {
    userimageResponse: [],
    fetchLoading: false,
    fetchError: false,
    fetchErrorMessage: null
};

const reportissueState = {
    reportissue: [],
    fetchLoading: false,
    fetchError: false,
    fetchErrorMessage: null
};


const submituserimageState = {
    userimageResponse: [],
    fetchLoading: false,
    fetchError: false,
    fetchErrorMessage: null
};

const usersState = {
    usersResponse: [],
    fetchLoading: false,
    fetchError: false,
    fetchErrorMessage: null
};


export const PUBLICGETUSERIMAGE = (state = {getuserimageState}, action) =>
{
    switch (action.type)
    {
        case USER_IMAGE_GET:
            return {
                ...state,
                getuserimageState: {
                    userimageResponse: action.payload,
                    fetchLoading: false,
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
      
        case USER_IMAGE_ERROR:
            return {
                ...state,
                getuserimageState: {
                    userimageResponse: [],
                    fetchLoading: false,
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};


export const PUBLICREPORTISSUE = (state = {reportissueState}, action) =>
{
    switch (action.type)
    {
        case REPORT_ISSUE_SUBMIT:
            return {
                ...state,
                reportissueState: {
                    reportissue: action.payload,
                    fetchLoading: false,
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
       
        case REPORT_ISSUE_ERROR:
            return {
                ...state,
                reportissueState: {
                    reportissue: [],
                    fetchLoading: false,
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

export const PUBLICSUBMITUSERIMAGE = (state = {submituserimageState}, action) =>
{
    switch (action.type)
    {
        case USER_IMAGE_SUBMIT:
            return {
                ...state,
                submituserimageState: {
                    userimageResponse: action.payload,
                    fetchLoading: false,
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
     
        case USER_IMAGE_ERROR:
            return {
                ...state,
                submituserimageState: {
                    userimageResponse: [],
                    fetchLoading: false,
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

export const PUBLICUSERSIGNUP = (state = {usersState}, action) =>
{
    switch (action.type)
    {
        case USER_SIGNUP:
            return {
                ...state,
                usersState: {
                    usersResponse: action.payload,
                    fetchLoading: false,
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
      
        case USER_ERROR:
            return {
                ...state,
                usersState: {
                    usersResponse: [],
                    fetchLoading: false,
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

