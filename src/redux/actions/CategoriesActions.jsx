import {categoryURL as apiURL} from '../config/ConfigURL';
import {
    CategoryError,
    CategoryGetAll,
    CategorySave,
    CategoryLoading
} from '../constants/CategoryConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
    AllCategoriesToastInfo,
    AllCategoriesToastError,
    SaveCategoryToastSuccess,
    SaveCategoryToastError,
} from '../../components/toasts/categoryToasts';

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
            dispatch(AllCategoriesToastInfo);
        })
        .catch(function (error) {
            dispatch(CategoryError(error));
            dispatch(hideLoading('LOADINGBAR'));
            dispatch(AllCategoriesToastError(error));            
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
            dispatch(SaveCategoryToastSuccess);
        })
        .catch(function (error) {
            let data = error.message;
            dispatch(CategoryError(error));
            dispatch(hideLoading('LOADINGBAR'));
            SaveCategoryToastError(data);     //invoke inside actions for error prompting      
        })
};



