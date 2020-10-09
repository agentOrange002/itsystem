export const AUTHORITY_GET_BY_USERID = 'AUTHORITY_GET_BY_USERID';
export const AUTHORITY_GET_ALL = 'AUTHORITY_GET_ALL';
export const AUTHORITY_GET_BY_ID = 'AUTHORITY_GET_BY_ID';
export const AUTHORITY_SAVE = 'AUTHORITY_SAVE';
export const AUTHORITY_UPDATE = 'AUTHORITY_UPDATE';
export const AUTHORITY_DELETE = 'AUTHORITY_DELETE';

export const AUTHORITY_LOADING = 'AUTHORITY_LOADING';
export const AUTHORITY_RESET = 'AUTHORITY_RESET';
export const AUTHORITY_ERROR = 'AUTHORITY_ERROR';

export const AuthorityReset  = () => {
    return ( {
        type: AUTHORITY_RESET
    } );
}

export const AuthorityLoading  = () => {
    return ( {
        type: AUTHORITY_LOADING
    } );
}

export const AuthorityError  = error => {
    return ( {
        type: AUTHORITY_ERROR, error:error
    } );
}

export const AuthorityGetAll  = data => {
    return ( {
        type: AUTHORITY_GET_ALL, payload:data
    } );
}

export const AuthorityGetByUserID  = data => {
    return ( {
        type: AUTHORITY_GET_BY_USERID, payload:data
    } );
}

export const AuthorityGetByID  = data => {
    return ( {
        type: AUTHORITY_GET_BY_ID, payload:data
    } );
}

export const AuthoritySave  = data => {
    return ( {
        type: AUTHORITY_SAVE, payload:data
    } );
}

export const AuthorityUpdate  = data => {
    return ( {
        type: AUTHORITY_UPDATE, payload:data
    } );
}

export const AuthorityDelete  = data => {
    return ( {
        type: AUTHORITY_DELETE, payload:data
    } );
}

