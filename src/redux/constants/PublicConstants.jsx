export const REPORT_ISSUE_SUBMIT = 'REPORT_ISSUE_SUBMIT';
export const REPORT_ISSUE_ERROR = 'REPORT_ISSUE_ERROR';
export const REPORT_ISSUE_LOADING = 'REPORT_ISSUE_LOADING';
export const REPORT_ISSUE_RESET = 'REPORT_ISSUE_RESET';

export const ReportIssueReset= () => {
    return ({
        type: REPORT_ISSUE_RESET
    });
}

export const ReportIssueLoading = () => {
    return ({
        type: REPORT_ISSUE_LOADING
    });
}

export const ReportIssueSubmit = data => {
    return ({
        type: REPORT_ISSUE_SUBMIT, payload: data
    });
}

export const ReportIssueError = error => {
    return ({
        type: REPORT_ISSUE_ERROR, error: error
    });
}

export const USER_IMAGE_SUBMIT = 'USER_IMAGE_SUBMIT';
export const USER_IMAGE_GET = 'USER_IMAGE_GET';
export const USER_IMAGE_ERROR = 'USER_IMAGE_ERROR';
export const USER_IMAGE_LOADING = 'USER_IMAGE_LOADING';
export const USER_IMAGE_RESET = 'USER_IMAGE_RESET';

export const UserImageLoading = () => {
    return ({
        type: USER_IMAGE_LOADING
    });
}

export const UserImageReset = () => {
    return ({
        type: USER_IMAGE_RESET
    });
}

export const UserImageSubmit = data => {
    return ({
        type: USER_IMAGE_SUBMIT, payload: data
    });
}

export const UserImageGet = data => {
    return ({
        type: USER_IMAGE_GET, payload: data
    });
}

export const UserImageError = error => {
    return ({
        type: USER_IMAGE_ERROR, error: error
    });
}

export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';
export const USER_SIGNUP_LOADING = 'USER_SIGNUP_LOADING';
export const USER_SIGNUP_RESET = 'USER_SIGNUP_RESET';

export const UserSignupReset = () => {
    return ( {
        type: USER_SIGNUP_RESET
    } );
} 

export const UserSignupLoading = () => {
    return ( {
        type: USER_SIGNUP_LOADING
    } );
} 

export const UserSignup = data => {
    return ( {
        type: USER_SIGNUP, payload:data
    } );
} 

export const UserSignupError = error => {
    return ( {
        type: USER_SIGNUP_ERROR, error:error
    } );
}

