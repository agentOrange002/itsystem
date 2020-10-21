import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllAddressesError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Loading All Addresses Has Failed.
        </span>
    </div>
);

const AllAddresses = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            All Addresses Has Been Loaded.
            </span>
    </div>
);

const SaveAddressError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Saving New Address.
        </span>
    </div>
);

const SaveAddress = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The New Address Has Been Successfully Saved.
            </span>
    </div>
);

export const AllAddressesToastInfo = () => toast.info(<AllAddresses />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AllAddressesToastError = () => toast.error(<AllAddressesError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveAddressToastSuccess = () => toast.success(<SaveAddress />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveAddressToastError = () => toast.error(<SaveAddressError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});