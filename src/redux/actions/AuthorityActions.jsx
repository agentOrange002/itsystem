import {authorityURL as apiURL} from '../config/ConfigURL';
import {
    AuthorityError,
    AuthorityGetAll,   
    AuthorityLoading
} from '../constants/AuthorityConstants';

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
            dispatch(AuthorityError(error));    
        })
};



