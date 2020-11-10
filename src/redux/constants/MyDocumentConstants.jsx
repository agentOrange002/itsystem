export const MYDOCUMENT_ERROR = 'MYDOCUMENT_ERROR';
export const MYDOCUMENT_GET_ALL = 'MYDOCUMENT_GET_ALL';
export const MYDOCUMENT_GET_BY_ID = 'MYDOCUMENT_GET_BY_ID';
export const MYDOCUMENT_SAVE = 'MYDOCUMENT_SAVE';
export const MYDOCUMENT_UPDATE = 'MYDOCUMENT_UPDATE';
export const MYDOCUMENT_DELETE = 'MYDOCUMENT_DELETE';
export const MYDOCUMENT_LOADING = 'MYDOCUMENT_LOADING';
export const MYDOCUMENT_RESET = 'MYDOCUMENT_RESET';

export const MyDocumentReset  = () => {
    return ( {
        type: MYDOCUMENT_RESET
    } );
}

export const MyDocumentLoading  = () => {
    return ( {
        type: MYDOCUMENT_LOADING
    } );
}

export const MyDocumentError  = error => {
    return ( {
        type: MYDOCUMENT_ERROR, error:error
    } );
}

export const MyDocumentGetAll  = data => {
    return ( {
        type: MYDOCUMENT_GET_ALL, payload:data
    } );
}

export const MyDocumentGetByID  = data => {
    return ( {
        type: MYDOCUMENT_GET_BY_ID, payload:data
    } );
}

export const MyDocumentSave  = data => {
    return ( {
        type: MYDOCUMENT_SAVE, payload:data
    } );
}

export const MyDocumentUpdate  = data => {
    return ( {
        type: MYDOCUMENT_UPDATE, payload:data
    } );
}

export const MyDocumentDelete  = data => {
    return ( {
        type: MYDOCUMENT_DELETE, payload:data
    } );
}

