export const TICKET_ERROR = 'TICKET_ERROR';
export const TICKET_GET_ALL_BY_ISSUEID = 'TICKET_GET_ALL_BY_ISSUEID';
export const TICKET_GET_ALL = 'TICKET_GET_ALL';
export const TICKET_GET_BY_ID = 'TICKET_GET_BY_ID';
export const TICKET_SAVE = 'TICKET_SAVE';
export const TICKET_UPDATE = 'TICKET_UPDATE';
export const TICKET_DELETE = 'TICKET_DELETE';
export const TICKET_LOADING = 'TICKET_LOADING';
export const TICKET_RESET = 'TICKET_RESET';

export const TicketLoading  = () => {
    return ( {
        type: TICKET_LOADING
    } );
}

export const TicketReset  = () => {
    return ( {
        type: TICKET_RESET
    } );
}

export const TicketError  = error => {
    return ( {
        type: TICKET_ERROR, error:error
    } );
}

export const TicketGetAll = data => {
    return ( {
        type: TICKET_GET_ALL, payload:data
    } );
}


export const TicketGetAllByIssueId  = data => {
    return ( {
        type: TICKET_GET_ALL_BY_ISSUEID, payload:data
    } );
}

export const TicketGetByID  = data => {
    return ( {
        type: TICKET_GET_BY_ID, payload:data
    } );
}

export const TicketSave  = data => {
    return ( {
        type: TICKET_SAVE, payload:data
    } );
}

export const TicketUpdate  = data => {
    return ( {
        type: TICKET_UPDATE, payload:data
    } );
}

export const TicketDelete  = data => {
    return ( {
        type: TICKET_DELETE, payload:data
    } );
}

