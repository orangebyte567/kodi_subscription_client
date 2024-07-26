import axios from 'axios';

const API = axios.create({ baseURL: 'https://kodi-subscription-server.vercel.app/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const register = (formData) => API.post('/users/register', formData);
export const login = (formData) => API.post('/users/login', formData);
export const getUserProfile = () => API.get('/users/profile');
export const resetPassword = (email) => API.post('/users/reset-password', { email });

export const createSubscription = (subscriptionData) => API.post('/subscriptions', subscriptionData);
export const getSubscription = (id) => API.get(`/subscriptions/${id}`);
export const cancelSubscription = () => API.post('/subscriptions/cancel');

export const createPayment = (paymentData) => API.post('/payments/create', paymentData);
export const executePayment = (paymentData) => API.post('/payments/execute', paymentData);
export const cancelPayment = () => API.post('/payments/cancel');

export const getAllUsers = () => API.get('/admin/users');
export const getUserDetails = (id) => API.get(`/admin/user/${id}`);
export const getReports = () => API.get('/admin/reports');
