export const MDISSUELOGS_ERROR = 'MDISSUELOGS_ERROR';
export const MDISSUELOGS_GET_ALL = 'MDISSUELOGS_GET_ALL';
export const MDISSUELOGS_SAVE = 'MDISSUELOGS_SAVE';
export const MDISSUELOGS_UPDATE = 'MDISSUELOGS_UPDATE';
export const MDISSUELOGS_DELETE = 'MDISSUELOGS_DELETE';
export const MDISSUELOGS_GET_BY_ID = 'MDISSUELOGS_GET_BY_ID';
export const MDISSUELOGS_GET_BY_ISSUEID = 'MDISSUELOGS_GET_BY_ISSUEID';
export const MDISSUELOGS_LOADING = 'MDISSUELOGS_LOADING';
export const MDISSUELOGS_RESET = 'MDISSUELOGS_RESET';

export const MDIssueLogsReset = () => {
    return ( {
        type: MDISSUELOGS_RESET
    } );
}

export const MDIssueLogsLoading = () => {
    return ( {
        type: MDISSUELOGS_LOADING
    } );
}

export const MDIssueLogsError  = error => {
    return ( {
        type: MDISSUELOGS_ERROR, error:error
    } );
}

export const MDIssueLogsGetAll  = data => {
    return ( {
        type: MDISSUELOGS_GET_ALL, payload:data
    } );
}

export const MDIssueLogsGetByID  = data => {
    return ( {
        type: MDISSUELOGS_GET_BY_ID, payload:data
    } );
}

export const MDIssueLogsGetByIssueID = data => {
    return ( {
        type: MDISSUELOGS_GET_BY_ISSUEID, payload:data
    } );
}

export const MDIssueLogsSave  = data => {
    return ( {
        type: MDISSUELOGS_SAVE, payload:data
    } );
}

export const MDIssueLogsUpdate  = data => {
    return ( {
        type: MDISSUELOGS_UPDATE, payload:data
    } );
}

export const MDIssueLogsDelete  = data => {
    return ( {
        type: MDISSUELOGS_DELETE, payload:data
    } );
}