import {getConfig} from "@app/Config";
import Mustache from 'mustache';
import axios from "axios";

const BASE_API = getConfig('BASE_API');

const collections = {
    AUTH_LOGIN: 'auth/login',
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