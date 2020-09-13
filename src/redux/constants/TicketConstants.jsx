export const TICKET_ERROR = 'TICKET_ERROR';
export const TICKET_GET_ALL_BY_ISSUEID = 'TICKET_GET_ALL_BY_ISSUEID';
export const TICKET_GET_BY_ID = 'TICKET_GET_BY_ID';
export const TICKET_SAVE = 'TICKET_SAVE';
export const TICKET_UPDATE = 'TICKET_UPDATE';
export const TICKET_DELETE = 'TICKET_DELETE';

export const TicketError  = error => {
    return ( {
        type: 'TICKET_ERROR', error:error
    } );
}

export const TicketGetAllByIssueId  = data => {
    return ( {
        type: 'TICKET_GET_ALL_BY_ISSUEID', payload:data
    } );
}

export const TicketGetByID  = data => {
    return ( {
        type: 'TICKET_GET_BY_ID', payload:data
    } );
}

export const TicketSave  = data => {
    return ( {
        type: 'TICKET_SAVE', payload:data
    } );
}

export const TicketUpdate  = data => {
    return ( {
        type: 'TICKET_UPDATE', payload:data
    } );
}

export const TicketDelete  = data => {
    return ( {
        type: 'TICKET_DELETE', payload:data
    } );
}

