import {
    USER_IMAGE_GET,
    USER_IMAGE_SUBMIT,
    USER_IMAGE_ERROR,
    USER_IMAGE_RESET,
    USER_SIGNUP,
    USER_SIGNUP_ERROR,
    USER_SIGNUP_RESET,
    REPORT_ISSUE_SUBMIT,
    REPORT_ISSUE_ERROR,
    REPORT_ISSUE_RESET,
} from '../constants/PublicConstants';

const getuserimageState = {
    userimageResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

const reportissueState = {
    reportissue: [],
    fetchError: false,
    fetchErrorMessage: null
};


const submituserimageState = {
    userimageResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

const usersState = {
    usersResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const PUBLICGETUSERIMAGE = (state = { getuserimageState }, action) => {
    switch (action.type) {
        case USER_IMAGE_RESET:
            return {
                ...state,
                getuserimageState: {
                    userimageResponse: [],                    
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_IMAGE_GET:
            return {
                ...state,
                getuserimageState: {
                    userimageResponse: action.payload,                   
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_IMAGE_ERROR:
            return {
                ...state,
                getuserimageState: {
                    userimageResponse: [],                  
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};


export const PUBLICREPORTISSUE = (state = { reportissueState }, action) => {
    switch (action.type) {
        case REPORT_ISSUE_RESET:
            return {
                ...state,
                reportissueState: {
                    reportissue: [],                 
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case REPORT_ISSUE_SUBMIT:
            return {
                ...state,
                reportissueState: {
                    reportissue: action.payload,                
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case REPORT_ISSUE_ERROR:
            return {
                ...state,
                reportissueState: {
                    reportissue: [],                 
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

export const PUBLICSUBMITUSERIMAGE = (state = { submituserimageState }, action) => {
    switch (action.type) {
        case USER_IMAGE_RESET:
            return {
                ...state,
                submituserimageState: {
                    userimageResponse: [],                 
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_IMAGE_SUBMIT:
            return {
                ...state,
                submituserimageState: {
                    userimageResponse: action.payload,                  
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_IMAGE_ERROR:
            return {
                ...state,
                submituserimageState: {
                    userimageResponse: [],                    
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

export const PUBLICUSERSIGNUP = (state = { usersState }, action) => {
    switch (action.type) {  
        case USER_SIGNUP_RESET:
            return {
                ...state,
                usersState: {
                    usersResponse: [],                
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_SIGNUP:
            return {
                ...state,
                usersState: {
                    usersResponse: action.payload,                  
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_SIGNUP_ERROR:
            return {
                ...state,
                usersState: {
                    usersResponse: [],                  
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

