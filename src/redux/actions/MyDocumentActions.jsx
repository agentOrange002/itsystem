import {documentURL as apiURL} from '../config/ConfigURL';
import {
    MyDocumentError,
    MyDocumentGetAll,  
    MyDocumentLoading
} from '../constants/MyDocumentConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
ToastInfo,ToastError
} from '../../components/toasts';
import _ from 'lodash';

export const getIssueDocuments = () => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    let email = getState().LOGIN_PROFILE.profileState.profileResponse.email;  
    dispatch(MyDocumentLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get(`/issues?email=${email}`,{      
        headers: {            
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(MyDocumentGetAll(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastInfo('User Documents has been loaded!');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            
            dispatch(MyDocumentError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);            
        })
};




