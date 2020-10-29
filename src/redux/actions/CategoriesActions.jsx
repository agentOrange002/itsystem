import {categoryURL as apiURL} from '../config/ConfigURL';
import {
    CategoryError,
    CategoryGetAll,
    CategorySave,
    CategoryLoading
} from '../constants/CategoryConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
ToastInfo,ToastSuccess,ToastError
} from '../../components/toasts';
import _ from 'lodash';

export const getAllCategories = () => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(CategoryLoading());
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.get('/all', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(CategoryGetAll(data));
            dispatch(hideLoading('LOADINGBAR'));
            ToastInfo('All category has been loaded!');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            
            dispatch(CategoryError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);            
        })
};

export const saveCategory = (formValues) => async (dispatch, getState) => {
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post('', formValues, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(CategorySave(data));
            dispatch(hideLoading('LOADINGBAR'));
           ToastSuccess('Successfully save new category!');
        })
        .catch(function (error) {
            // let errorResponse = null;
            // let errorMessage = null;
         
            // if(_.isEmpty(error.response)){
            //     errorResponse = error;
            //     errorMessage = error.message;               
            // }
            // else{
            //     errorResponse = error.response.data;
            //     errorMessage = error.response.data.message;
                
            // }
           
            let errorResponse = error;
            let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            
            dispatch(CategoryError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);     //invoke inside actions for error prompting      
        })
};



