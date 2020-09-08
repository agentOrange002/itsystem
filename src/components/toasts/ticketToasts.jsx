import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTicketsError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Loading All Tickets Has Failed.
        </span>
    </div>
);

const AllTickets = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            All Tickets Has Been Loaded.
            </span>
    </div>
);

const SaveTicketError = () => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            Error In Saving New Ticket.
        </span>
    </div>
);

const SaveTicket = () => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
            The New Ticket Has Been Successfully Saved.
            </span>
    </div>
);

export const AllTicketsToastInfo = () => toast.info(<AllTickets />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const AllTicketsToastError = () => toast.error(<AllTicketsError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveTicketToastSuccess = () => toast.success(<SaveTicket />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const SaveTicketToastError = () => toast.error(<SaveTicketError />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});