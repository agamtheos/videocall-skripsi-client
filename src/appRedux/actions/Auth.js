import Api, {getCollection} from "../../util/Api";
import {
    AUTH_TOKEN,
    AUTH_IS_VALID,
    AUTH_ROLE,
    AUTH_PROFILE,
    AUTH_LOGOUT,
} from "../../constants/ActionTypes";

export const userPurgeAuth = () => {
    return (dispatch) => {
        dispatch({type: AUTH_TOKEN, payload: null});
        dispatch({type: AUTH_ROLE, payload: null});
        dispatch({type: AUTH_IS_VALID, payload: false});
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
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
                dispatch(userGetProfile());
                localStorage.setItem('token', data.data.data.token);
                localStorage.setItem('role', data.data.data.role);
                localStorage.setItem('username', username);
                resolve(data.data.data.token);
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const userSignOut = (username) => {
    Api.get(getCollection('AUTH_LOGOUT', {username}));
	return (dispatch) => dispatch(userPurgeAuth());
}

export const userRegister = (username, password, role) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.post(getCollection('AUTH_REGISTER'), {username, password, role});
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const userGetProfile = () => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data: {data}} = await Api.get(getCollection('AUTH_PROFILE'));
                dispatch({type: AUTH_PROFILE, payload: data});
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const forgotPassword = (username) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.post(getCollection('AUTH_FORGOT_PASSWORD'), {username});
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const resetPassword = (username, password) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.post(getCollection('AUTH_RESET_PASSWORD'), {username, password});
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