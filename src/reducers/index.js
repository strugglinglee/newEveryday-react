import {combineReducers } from "redux";
import data from "./data";

const reducers=combineReducers({
    data,
    prename:(state="",action)=>{
        switch(action.type){
            case "setname":
            return action.prename
            default:
            return state
        }
    }
})

export default reducers;