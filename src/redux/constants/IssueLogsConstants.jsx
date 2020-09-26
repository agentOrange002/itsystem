export const ISSUELOGS_ERROR = 'ISSUELOGS_ERROR';
export const ISSUELOGS_GET_ALL = 'ISSUELOGS_GET_ALL';
export const ISSUELOGS_SAVE = 'ISSUELOGS_SAVE';
export const ISSUELOGS_UPDATE = 'ISSUELOGS_UPDATE';
export const ISSUELOGS_DELETE = 'ISSUELOGS_DELETE';
export const ISSUELOGS_GET_BY_ID = 'ISSUELOGS_GET_BY_ID';
export const ISSUELOGS_GET_BY_ISSUEID = 'ISSUELOGS_GET_BY_ISSUEID';
export const ISSUELOGS_LOADING = 'ISSUELOGS_LOADING';
export const ISSUELOGS_RESET = 'ISSUELOGS_RESET';

export const IssueLogsReset = () => {
    return ( {
        type: ISSUELOGS_RESET
    } );
}

export const IssueLogsLoading = () => {
    return ( {
        type: ISSUELOGS_LOADING
    } );
}

export const IssueLogsError  = error => {
    return ( {
        type: ISSUELOGS_ERROR, error:error
    } );
}

export const IssueLogsGetAll  = data => {
    return ( {
        type: ISSUELOGS_GET_ALL, payload:data
    } );
}

export const IssueLogsGetByID  = data => {
    return ( {
        type: ISSUELOGS_GET_BY_ID, payload:data
    } );
}

export const IssueLogsGetByIssueID = data => {
    return ( {
        type: ISSUELOGS_GET_BY_ISSUEID, payload:data
    } );
}

export const IssueLogsSave  = data => {
    return ( {
        type: ISSUELOGS_SAVE, payload:data
    } );
}

export const IssueLogsUpdate  = data => {
    return ( {
        type: ISSUELOGS_UPDATE, payload:data
    } );
}

export const IssueLogsDelete  = data => {
    return ( {
        type: ISSUELOGS_DELETE, payload:data
    } );
}