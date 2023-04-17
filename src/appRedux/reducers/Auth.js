import cookies from 'js-cookie'
import {
	AUTH_LOADING,
	AUTH_TOKEN,
    AUTH_IS_VALID,
    AUTH_ROLE,
} from '../../constants/ActionTypes';
import { getConfig } from '../../Config';

const COOKIE_TOKEN_KEY = getConfig('COOKIE_TOKEN_KEY');

const INIT_STATE = {
    loading: false,
    token: cookies.get(COOKIE_TOKEN_KEY) || null,
    isValid: !!cookies.get(COOKIE_TOKEN_KEY),
    role: null,
};

const Store = (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_LOADING: {
            return {...state, loading: action.payload ? true : false};
        }

        case AUTH_TOKEN: {
            if (action.payload) {
                cookies.set(COOKIE_TOKEN_KEY, action.payload);
            } else {
                cookies.remove(COOKIE_TOKEN_KEY);
            }
            return {...state, token: action.payload ?? null};
        }

        case AUTH_IS_VALID: {
            return {...state, isValid: action.payload ? true : false};
        }

        case AUTH_ROLE: {
            return {...state, role: action.payload ?? null};
        }

        default:
            return state;
    }
};

export default Store;