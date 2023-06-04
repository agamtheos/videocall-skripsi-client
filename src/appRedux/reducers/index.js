import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import Auth from "./Auth";
import Users from "./Users";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth,
    users: Users,
})

export default createRootReducer