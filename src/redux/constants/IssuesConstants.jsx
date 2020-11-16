export const ISSUES_GET_ALL = 'ISSUES_GET_ALL';
export const ISSUES_GET_BY_ID = 'ISSUES_GET_BY_ID'; 
export const ISSUES_SAVE = 'ISSUES_SAVE';
export const ISSUES_UPDATE = 'ISSUES_UPDATE';
export const ISSUES_DELETE = 'ISSUES_DELETE';
export const ISSUES_ERROR = 'ISSUES_ERROR';
export const ISSUES_ASSIGNED_SUPPORT = 'ISSUES_ASSIGNED_SUPPORT';
export const ISSUES_OWNED_THIS_ISSUE = 'ISSUES_OWNED_THIS_ISSUE';
export const ISSUES_LOADING = 'ISSUES_LOADING';
export const ISSUES_RESET = 'ISSUES_RESET';

export const IssuesReset = () => {
    return ( {
        type: ISSUES_RESET
    } );
}
 

export const IssuesLoading = () => {
    return ( {
        type: ISSUES_LOADING
    } );
}
 
export const IssuesGetAll = data => {
    return ( {
        type: ISSUES_GET_ALL, payload:data
    } );
}

export const IssuesGetById = data => {
    return ( {
        type: ISSUES_GET_BY_ID, payload:data
    } );
}

export const IssuesSave = data => {
    return ( {
        type: ISSUES_SAVE, payload:data
    } );
}

export const IssuesUpdate = data => {
    return ( {
        type: ISSUES_UPDATE, payload:data
    } );
}

export const IssuesDelete = data => {
    return ( {
        type: ISSUES_DELETE, payload:data
    } );
}


export const IssuesError  = error => {
    return ( {
        type: ISSUES_ERROR, error:error
    } );
}
 
export const IssuesAssignedSupport = data => {
    return ( {
        type: ISSUES_ASSIGNED_SUPPORT, payload:data
    } );
}

export const IssuesOwnedThisIssue = data => {
    return ( {
        type: ISSUES_OWNED_THIS_ISSUE, payload:data
    } );
}

