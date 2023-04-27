import * as api from '../api';

export const getUid = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUid();
        dispatch({type: 'FETCH_ALL', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}