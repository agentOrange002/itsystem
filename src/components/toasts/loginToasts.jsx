import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileLoad = () => (
    <div>
        <span>
            <i className="pi pi-check" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            User Profile Has Successfully Loaded.
        </span>
    </div>
);

const ProfileUpdate = () => (
    <div>
        <span>
            <i className="pi pi-check" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            User Profile Has Successfully Updated.
        </span>
    </div>
);

const ProfileError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            User Profile Has Failed To Update.
        </span>
    </div>
);

const Login = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Welcome to ITS System.
            </span>
    </div>
);

export const LoginToast = () => toast.dark(<Login />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ProfileToast = () => toast.info(<ProfileLoad />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ProfileUpdateToast = () => toast.success(<ProfileUpdate />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ProfileErrorToast = () => toast.error(<ProfileError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});