import Mustache from 'mustache';
import axios from "axios";
import { getConfig } from '../Config';

const BASE_API = getConfig('BASE_API')

const collections = {
    AUTH_LOGIN: 'auth/login',
    AUTH_VERIFY_TOKEN: 'auth/verify-token',
    AUTH_REGISTER: 'auth/register',
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

export default axios;