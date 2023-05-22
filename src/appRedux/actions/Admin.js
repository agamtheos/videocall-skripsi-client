import Api, {getCollection} from "../../util/Api";
import {
    ADMIN_ONLINE,
} from "../../constants/ActionTypes";

export const getAllAdminsOnline = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Api.get(getCollection('ADMIN_ONLINE'));
                await dispatch({type: ADMIN_ONLINE, payload: data.data.data});
                resolve(data.data.data);
            } catch (error) {
                reject(error);
            }
        });
    };
};