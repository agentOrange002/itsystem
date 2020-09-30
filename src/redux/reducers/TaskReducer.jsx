import {
    TASK_GET_ALL_BY_ISSUEID,
    TASK_GET_ALL,
    TASK_GET_BY_ID,
    TASK_SAVE,
    TASK_UPDATE,
    TASK_DELETE,
    TASK_ERROR,
    TASK_RESET,
} from '../constants/TaskConstants';
import _ from 'lodash';

const TasksState = {
    tasksResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const TASKS = (state = TasksState, action) => {
    switch (action.type) {
        case TASK_RESET:
            return {
                ...state,
                tasksResponse: [],
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_GET_ALL:
            return {
                ...state,
                tasksResponse: _.mapKeys(action.payload, 'taskId'),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_GET_ALL_BY_ISSUEID:
            return {
                ...state,
                tasksResponse: _.mapKeys(action.payload, 'taskId'),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_GET_BY_ID:
            return {
                ...state,
                tasksResponse: { ...state.tasksResponse, [action.payload.taskId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_SAVE:
            return {
                ...state,
                tasksResponse: { ...state.tasksResponse, [action.payload.taskId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_UPDATE:
            return {
                ...state,
                tasksResponse: { ...state.tasksResponse, [action.payload.taskId]: action.payload },
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_DELETE:
            return {
                ...state,
                tasksResponse: _.omit(state.tasksResponse, action.payload.taskId),
                fetchError: false,
                fetchErrorMessage: null
            };
        case TASK_ERROR:
            return {
                ...state,
                tasksResponse: { ...state.tasksResponse },
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



