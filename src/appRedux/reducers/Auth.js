import cookies from 'js-cookie'
import {
	AUTH_LOADING,
	AUTH_TOKEN,
    AUTH_IS_VALID,
    AUTH_ROLE,
    AUTH_PROFILE,
} from '../../constants/ActionTypes';

const COOKIE_TOKEN_KEY = 'cl5ZIING9PPzJjgSGEgp';

const INIT_STATE = {
    loading: false,
    token: cookies.get(COOKIE_TOKEN_KEY) || null,
    isValid: !!cookies.get(COOKIE_TOKEN_KEY),
    role: null,
    profile: null,
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

        case AUTH_PROFILE: {
            return {...state, profile: action.payload ?? null};
        }

        default:
            return state;
    }
};

export default Store;