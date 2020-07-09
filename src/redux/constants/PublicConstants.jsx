export const REPORT_ISSUE_SUBMIT = 'REPORT_ISSUE_SUBMIT';
export const REPORT_ISSUE_ERROR = 'REPORT_ISSUE_ERROR';

export const USER_IMAGE_SUBMIT = 'USER_IMAGE_SUBMIT';
export const USER_IMAGE_GET = 'USER_IMAGE_GET';
export const USER_IMAGE_ERROR = 'USER_IMAGE_ERROR';

export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_ERROR = 'USER_ERROR';

export const reportissuesubmit = data =>
{
    return ({
        type: REPORT_ISSUE_SUBMIT, payload: data
    });
}

export const reportissueerror = error =>
{
    return ({
        type: REPORT_ISSUE_ERROR, error: error
    });
}

export const userimagesubmit = data =>
{
    return ({
        type: USER_IMAGE_SUBMIT, payload: data
    });
}

export const userimageget = data =>
{
    return ({
        type: USER_IMAGE_GET, payload: data
    });
}

export const userimageerror = error =>
{
    return ({
        type: USER_IMAGE_ERROR, error: error
    });
}

export const signup = data => {
    return ( {
        type: 'USER_SIGNUP', payload:data
    } );
} 

export const signuperror = error => {
    return ( {
        type: 'USER_ERROR', error:error
    } );
}

