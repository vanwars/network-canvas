import * as api from '../api';

export const getProtocol = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProtocol();
        dispatch({type: 'FETCH_ALL', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}

export const createProtocol = (protocol) => async (dispatch) => {
    try {
        console.log(protocol);
        const { data } = await api.createProtocol(protocol);
        console.log(data);
        dispatch({type: 'CREATE', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}

export const updateProtocol = (id, protocol) => async (dispatch) => {
    try {
        const { data } = await api.updateProtocol(id, protocol);
        // console.log("updated stage data: ", data);
        dispatch({type: 'UPDATE', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}