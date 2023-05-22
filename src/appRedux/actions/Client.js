import Api, {getCollection} from "../../util/Api";
import {
    CLIENT_ONLINE,
} from "../../constants/ActionTypes";

export const getAllClientsOnline = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Api.get(getCollection('CLIENT_ONLINE'));
                await dispatch({type: CLIENT_ONLINE, payload: data.data.data});
                resolve(data.data.data);
            } catch (error) {
                reject(error);
            }
        });
    };
};