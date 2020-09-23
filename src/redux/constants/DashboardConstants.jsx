export const DASHBOARD_ERROR = 'DASHBOARD_ERROR';
export const DASHBOARD_GET_ALL = 'DASHBOARD_GET_ALL';
export const DASHBOARD_LOADING = 'DASHBOARD_LOADING';

export const DashboardLoading  = () => {
    return ( {
        type: 'DASHBOARD_LOADING'
    } );
}

export const DashboardError  = error => {
    return ( {
        type: 'DASHBOARD_ERROR', error:error
    } );
}

export const DashboardGetAll  = data => {
    return ( {
        type: 'DASHBOARD_GET_ALL', payload:data
    } );
}
