import axios from 'axios';

const stageurl = "https://network-canvas-web.herokuapp.com/stages";
const protocolurl = "https://network-canvas-web.herokuapp.com/protocol";
const uidurl = "https://network-canvas-web.herokuapp.com/uid";

export const fetchStages = () => axios.get(stageurl);
export const createStage = (newStage) => axios.post(stageurl, newStage);
export const updateStage = (id, updatedStage) => axios.patch(`${stageurl}/${id}`, updatedStage);

export const fetchProtocol = () => axios.get(protocolurl)
export const createProtocol = (newProtocol) => axios.post(protocolurl, newProtocol);
export const updateProtocol = (id, updatedProtocol) => axios.patch(`${protocolurl}/${id}`, updatedProtocol);

export const fetchUid = () => axios.get(uidurl);