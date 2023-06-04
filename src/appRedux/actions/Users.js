import {
    USERS_LOADING,
	USERS_QUERY,
    USERS_SORTER,
    USERS_STATUS,
	USERS_DATA,
	USERS_TOTAL,
	USERS_PAGE,
	USERS_ROWS_PER_PAGE
} from "../../constants/ActionTypes";

import Api, {getCollection} from "../../util/Api";

export const getUsersList = () => {
    return (dispatch, getState) => {
        const {query, page, rowsPerPage, sorter} = getState().users;
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({type: USERS_LOADING, payload: true});
                let params = {page, size: rowsPerPage};
                if (query.trim()) params['q'] = query.trim();
                if (sorter) params['sort'] = sorter;
                const {data: {data, meta}} = await Api.get(getCollection('USER_LIST'), {params});
                await dispatch({type: USERS_DATA, payload: data});
                await dispatch({type: USERS_TOTAL, payload: meta?.total ?? 0});
                resolve();
            } catch (error) {
                reject(error);
            } finally {
                dispatch({type: USERS_LOADING, payload: false});
            }
        });        
    };
};

export const resetUsersSorterFilters = () => {
	return (dispatch) =>
	{
		dispatch({type: USERS_SORTER, payload: null});
	}
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.delete(getCollection('USER_DELETE', {id}));
                dispatch(getUsersList());
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });        
    };
};

export const handleUserPagination = (page, rowsPerPage) => {
    return (dispatch) => {
        dispatch({type: USERS_PAGE, payload: page});
        dispatch({type: USERS_ROWS_PER_PAGE, payload: rowsPerPage});
        dispatch(getUsersList());
    };
}; 

export const handleUsersSorter = (value) => {
    return (dispatch) => {
        dispatch({type: USERS_SORTER, payload: value ? value : null});
        dispatch(getUsersList());
    };
};

export const searchUsers = (value) =>
{
	return (dispatch) =>
	{
		dispatch({type: USERS_QUERY, payload: value});
		dispatch(getUsersList());
	}
}

export const updateUser = (id, value) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.put(getCollection('USER_UPDATE', {id}), value);
                dispatch(getUsersList());
                resolve();
            } catch (error) {
                reject(error);
            }
        });        
    };
};

export const createUser = (value) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Api.post(getCollection('USER_CREATE'), value);
                dispatch(getUsersList());
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
};

export const getUserDetail = (id) => {
	return () => {
		return new Promise(async (resolve, reject) => {
			try {
				const {data: {data}} = await Api.get(getCollection('USER_DETAIL', {id}));
				resolve(data);
			} catch(e) {
				reject(e);
			}
		});
	}
}