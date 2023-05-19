import Api, {getCollection} from "../../util/Api";
import {
    AUTH_TOKEN,
    AUTH_IS_VALID,
    AUTH_ROLE,
} from "../../constants/ActionTypes";

export const userPurgeAuth = () => {
    return (dispatch) => {
        dispatch({type: AUTH_TOKEN, payload: null});
        dispatch({type: AUTH_ROLE, payload: null});
        dispatch({type: AUTH_IS_VALID, payload: false});
    };
};

export const userSignIn = (username, password) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Api.post(getCollection('AUTH_LOGIN'), {username, password});
                await dispatch({type: AUTH_TOKEN, payload: data.data.data.token});
				await dispatch({type: AUTH_ROLE, payload: data.data.data.role});
                await dispatch({type: AUTH_IS_VALID, payload: true});
                resolve(data.data.data.token);
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const userRegister = (username, password) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.post(getCollection('AUTH_REGISTER'), {username, password});
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const userVerifyToken = () => {
    return (dispatch, getState) => {
        const {auth: {token}} = getState();
        return new Promise(async (resolve, reject) => {
            if (token) {
                try {
                    const {data: {data: {token, role}}} = Api.post(getCollection('AUTH_VERIFY_TOKEN'));
                    await dispatch({type: AUTH_TOKEN, payload: token});
                    await dispatch({type: AUTH_ROLE, payload: role});
                    await dispatch({type: AUTH_IS_VALID, payload: true});
                    resolve();
                } catch (error) {
                    reject(error);
                }
            } else {
                dispatch(userPurgeAuth());
				resolve();
            }
        });
    };
};