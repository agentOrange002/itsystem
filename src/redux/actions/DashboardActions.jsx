import {dashboardURL as apiURL} from '../config/ConfigURL';
import {
    DashboardError,
    DashboardGetAll,
    DashboardLoading
} from '../constants/DashboardConstants';
import _ from 'lodash';

export const getDashboard = () => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(DashboardLoading());
    await apiURL.get("/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(DashboardGetAll(data));
        })
        .catch(function (error) {
            let errorResponse = error;
            //let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
               // errorMessage = error.response.data.message;
            }
            dispatch(DashboardError(errorResponse));
        })
};





