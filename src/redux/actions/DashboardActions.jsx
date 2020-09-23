import apiURL from '../config/dashboardAPIURL';
import {
    DashboardError,
    DashboardGetAll,  
    DashboardLoading
} from '../constants/DashboardConstants';

export const getDashboard = () => async (dispatch,getState) => {    
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(DashboardLoading());   
    await apiURL.get("/",{headers:{
        'Content-Type':'application/json',
        'Authorization':token     
      }})
    .then(function (response) {
        let data = response.data;       
        dispatch(DashboardGetAll(data));        
    })
    .catch(function(error) {    
        dispatch(DashboardError(error));        
    }) 
};





