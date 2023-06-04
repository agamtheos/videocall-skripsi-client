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

const INIT_STATE = {
    loading: false,
    query: '',
    sorter: null,
    status: null,
    data: [],
    total: 0,
    page: 1,
    rowsPerPage: 20
};

const Store = (state = INIT_STATE, action) =>
{
    switch (action.type)
    {
    case USERS_LOADING: {
        return {...state, loading: action.payload ? true : false};
    }

    case USERS_QUERY: {
        return {...state, query: action.payload ?? ''};
    }

    case USERS_SORTER: {
        return {...state, sorter: action.payload ?? null};
    }

    case USERS_STATUS: {
        return {...state, status: action.payload ?? null};
    }

    case USERS_DATA: {
        return {...state, data: action.payload ?? []};
    }

    case USERS_TOTAL: {
        return {...state, total: action.payload ?? 0};
    }

    case USERS_PAGE: {
        return {...state, page: action.payload ?? 1};
    }

    case USERS_ROWS_PER_PAGE: {
        return {...state, rowsPerPage: action.payload ?? 20};
    }

    default:
        return state;
    }
}

export default Store;