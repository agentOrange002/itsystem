import axios from 'axios';

export const urlBackEnd = 'http://localhost:8080/itsystem/api';

export const loginURL = axios.create({
    baseURL: 'http://localhost:8080/itsystem'
});

export const addressURL = axios.create({
    baseURL: `${urlBackEnd}/useraddresses`
});

export const authorityURL = axios.create({
    baseURL: `${urlBackEnd}/authorities`
});

export const categoryURL = axios.create({
    baseURL: `${urlBackEnd}/issuecategories`
});

export const dashboardURL = axios.create({
    baseURL: `${urlBackEnd}/dashboard`
});

export const issuelogURL = axios.create({
    baseURL: `${urlBackEnd}/issuelogs`
});

export const issueURL = axios.create({
    baseURL: `${urlBackEnd}/issues`
});

export const publicURL = axios.create({
    baseURL: `${urlBackEnd}/public`
});

export const taskURL = axios.create({
    baseURL: `${urlBackEnd}/tasks`
});

export const ticketURL = axios.create({
    baseURL: `${urlBackEnd}/tickets`
});

export const userimageURL = axios.create({
    baseURL: `${urlBackEnd}/userimages`
});

export const userURL = axios.create({   
    baseURL: `${urlBackEnd}/users`
});

export const documentURL = axios.create({
    baseURL: `${urlBackEnd}/userdocuments`
});












