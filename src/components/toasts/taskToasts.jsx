import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTasksError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Loading All Tasks Has Failed.
        </span>
    </div>
);

const AllTasks = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            All Tasks Has Been Loaded.
            </span>
    </div>
);

const SaveTaskError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Saving New Task.
        </span>
    </div>
);

const SaveTask = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The New Task Has Been Successfully Saved.
            </span>
    </div>
);

export const AllTasksToastInfo = () => toast.info(<AllTasks />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AllTasksToastError = () => toast.error(<AllTasksError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveTaskToastSuccess = () => toast.success(<SaveTask />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveTaskToastError = () => toast.error(<SaveTaskError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});