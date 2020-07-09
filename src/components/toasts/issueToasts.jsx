import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllIssuesError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Loading All Issues Has Failed.
        </span>
    </div>
);

const AllIssues= () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            All Issues Has Been Successfully Loaded.
        </span>
    </div>
);

const GetIssueError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Getting The Issue.
        </span>
    </div>
);

const GetIssue = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Successfully Get The Issue.
        </span>
    </div>
);

const SaveIssueError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Saving the Issue.
        </span>
    </div>
);

const SaveIssue = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The New Issue Has Been Successfully Saved.
        </span>
    </div>
);

const UpdateIssueError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Updating the Issue.
        </span>
    </div>
);

const UpdateIssue = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The Issue Has Been Successfully Updated.
        </span>
    </div>
);

const DeleteIssueError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Deleting the Issue.
        </span>
    </div>
);

const DeleteIssue = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The Issue Has Been Successfully Deleted.
        </span>
    </div>
);

const AssignSupportError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Assigning a Support in the Issue.
        </span>
    </div>
);

const AssignSupport = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The Issue Has Been Successfully Assigned A Support.
        </span>
    </div>
);

const OwnedThisIssueError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Owning this Issue.
        </span>
    </div>
);

const OwnedThisIssue = () => (
    <div>
        <span>
            <i className="pi pi-check" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Your Now The Owner of this Issue.
        </span>
    </div>
);



export const AllIssuesToastInfo = () => toast.info(<AllIssues />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AllIssuesToastError= () => toast.error(<AllIssuesError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const GetIssueToastSuccess = () => toast.success(<GetIssue />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const GetIssueToastError = () => toast.error(<GetIssueError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveIssueToastSuccess = () => toast.success(<SaveIssue />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveIssueToastError = () => toast.error(<SaveIssueError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const UpdateIssueToastSuccess = () => toast.success(<UpdateIssue />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const UpdateIssueToastError = () => toast.error(<UpdateIssueError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const DeleteIssueToastSuccess = () => toast.success(<DeleteIssue />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const DeleteIssueToastError = () => toast.error(<DeleteIssueError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AssignSupportToastSuccess = () => toast.success(<AssignSupport />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AssignSupportToastError = () => toast.error(<AssignSupportError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const OwnedThisIssueToastSuccess = () => toast.success(<OwnedThisIssue />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const OwnedThisIssueToastError = () => toast.error(<OwnedThisIssueError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});






