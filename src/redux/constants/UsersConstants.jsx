
export const USER_SAVE = 'USER_SAVE';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_DELETE = 'USER_DELETE';
export const USER_GET_ALL= 'USER_GET_ALL';
export const USER_GET_BY_ID= 'USER_GET_BY_ID';
export const USER_ERROR = 'USER_ERROR';

export const UserSave = data => {
    return ( {
        type: 'USER_SAVE', payload:data
    } );
} 

export const UserUpdate = data => {
    return ( {
        type: 'USER_UPDATE', payload:data
    } );
} 

export const UserDelete = data => {
    return ( {
        type: 'USER_DELETE', payload:data
    } );
} 

export const UserGetAll = data => {
    return ( {
        type: 'USER_GET_ALL', payload:data
    } );
} 

export const UserGetByID = data => {
    return ( {
        type: 'USER_GET_BY_ID', payload:data
    } );
} 

export const UserError = error => {
    return ( {
        type: 'USER_ERROR', error:error
    } );
}


