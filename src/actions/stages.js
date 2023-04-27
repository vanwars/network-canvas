import * as api from '../api';

export const getStages = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStages();
        dispatch({type: 'FETCH_ALL', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}

export const createStage = (stage) => async (dispatch) => {
    try {
        console.log(stage);
        const { data } = await api.createStage(stage);
        console.log(data);
        dispatch({type: 'CREATE', payload: data});
    }
    catch (error) {
        console.log(error.message);
    }
}

export const updateStage = (id, stage) => async (dispatch) => {
    try {
        const { data } = await api.updateStage(id, stage);
        // console.log("updated stage data: ", data);
        dispatch({type: 'UPDATE', payload: data});
    }
    catch (error) {
        console.log(error);
    }
}