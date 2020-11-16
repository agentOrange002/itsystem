import {authorityURL as apiURL} from '../config/ConfigURL';
import {
    AuthorityError,
    AuthorityGetAll,   
    AuthorityLoading
} from '../constants/AuthorityConstants';
import _ from 'lodash';

export const getAllAuthoritiesByUserId = () => async (dispatch, getState) => {
    let id = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(AuthorityLoading());   
    await apiURL.get(`/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(AuthorityGetAll(data));    
        })
        .catch(function (error) {
            let errorResponse = error;
           // let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                //errorMessage = error.response.data.message;
            }
            dispatch(AuthorityError(errorResponse));    
        })
};



