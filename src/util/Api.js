import Mustache from 'mustache';
import axios from "axios";

import store from '../appRedux/store';
import { getConfig } from '../Config';

const BASE_API = getConfig('BASE_API')

const collections = {
    AUTH_LOGIN: 'auth/login',
    AUTH_VERIFY_TOKEN: 'auth/verify-token',
    AUTH_REGISTER: 'auth/register',
    AUTH_PROFILE: 'auth/profile',
    AUTH_LOGOUT: 'auth/logout/{{username}}',
    AUTH_FORGOT_PASSWORD: 'auth/forgot-password',
    AUTH_RESET_PASSWORD: 'auth/reset-password',
    CLIENT_ONLINE: 'client/online',
    ADMIN_ONLINE: 'admin/online',
}

export const getCollection = (key, object) =>
{
	return collections.hasOwnProperty(key) ? BASE_API + Mustache.render(collections[key], object) : null;
}

axios.create({
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axios.interceptors.request.use(function (config) {
	const {auth: {token}} = store.getState();

	let customHeaders = {};

	if (token) customHeaders['Authorization'] = `Bearer ${token}`;
	// customHeaders['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	customHeaders['X-Requested-With'] = 'XMLHttpRequest';

	config.headers = customHeaders;

    return config;
});

export default axios;