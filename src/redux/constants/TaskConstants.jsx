export const TASK_ERROR = 'TASK_ERROR';
export const TASK_GET_ALL_BY_ISSUEID = 'TASK_GET_ALL_BY_ISSUEID';
export const TASK_GET_ALL_BY_TICKETID = 'TASK_GET_ALL_BY_TICKETID';
export const TASK_GET_ALL = 'TASK_GET_ALL';
export const TASK_GET_BY_ID = 'TASK_GET_BY_ID';
export const TASK_SAVE = 'TASK_SAVE';
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_DELETE = 'TASK_DELETE';
export const TASK_LOADING = 'TASK_LOADING';
export const TASK_RESET = 'TASK_RESET';

export const TaskLoading  = () => {
    return ( {
        type: TASK_LOADING
    } );
}

export const TaskReset  = () => {
    return ( {
        type: TASK_RESET
    } );
}

export const TaskError  = error => {
    return ( {
        type: TASK_ERROR, error:error
    } );
}

export const TaskGetAll = data => {
    return ( {
        type: TASK_GET_ALL, payload:data
    } );
}

export const TaskGetAllByTicketId  = data => {
    return ( {
        type: TASK_GET_ALL_BY_TICKETID, payload:data
    } );
}

export const TaskGetAllByIssueId  = data => {
    return ( {
        type: TASK_GET_ALL_BY_ISSUEID, payload:data
    } );
}

export const TaskGetByID  = data => {
    return ( {
        type: TASK_GET_BY_ID, payload:data
    } );
}

export const TaskSave  = data => {
    return ( {
        type: TASK_SAVE, payload:data
    } );
}

export const TaskUpdate  = data => {
    return ( {
        type: TASK_UPDATE, payload:data
    } );
}

export const TaskDelete  = data => {
    return ( {
        type: TASK_DELETE, payload:data
    } );
}

