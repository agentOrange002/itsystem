import {
    DASHBOARD_ERROR,
    DASHBOARD_GET_ALL,  
} from '../constants/DashboardConstants';
import _ from 'lodash';

const DashboardState = {
    dashboardResponse: [],   
    fetchError: false,
    fetchErrorMessage: null
};

export const DASHBOARD = (state = DashboardState, action) => {
    switch (action.type) {
        case DASHBOARD_GET_ALL:
            return {
                ...state,
                dashboardResponse: action.payload,              
                fetchError: false,
                fetchErrorMessage: null
            };
        case DASHBOARD_ERROR:
            return {
                ...state,
                dashboardResponse: { ...state.dashboardResponse },           
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



