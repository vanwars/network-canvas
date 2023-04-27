import { combineReducers } from "redux";
import stages from './stages';
import protocol from "./protocol";
import uid from "./uid";

export const reducers = combineReducers({
    stages: stages, protocol: protocol, uid: uid,
});