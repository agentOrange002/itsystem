import axios from 'axios';

export const urlBackEnd = 'http://localhost:8080/api';

export const authorityURL = axios.create({
    baseURL: `${urlBackEnd}/authorities`
});

export const categoryURL = axios.create({
    baseURL: `${urlBackEnd}/category`
});

export const dashboardURL = axios.create({
    baseURL: `${urlBackEnd}/dashboard`
});

export const issuelogURL = axios.create({
    baseURL: `${urlBackEnd}/issuelog`
});

export const issueURL = axios.create({
    baseURL: `${urlBackEnd}/issues`
});

export const loginURL = axios.create({
    baseURL:`${urlBackEnd}`
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













