import Api, {getCollection} from "@util/Api";
import {
    AUTH_TOKEN,
    AUTH_IS_VALID,
    AUTH_ROLE,
    AUTH_PROFILE,
    AUTH_ACCESS_FEATURE
} from "@constants/ActionTypes";

export const userPurgeAuth = () => {
    return (dispatch) => {
        dispatch({type: AUTH_TOKEN, payload: null});
        dispatch({type: AUTH_ROLE, payload: null});
    };
};

export const userSignIn = (username, password) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                const data = 
            } catch (error) {
                
            }
        });
    };
};