import { combineReducers } from "redux";
import authReducer from "./auth";
import campaignsReducer from "./campaigns";

const rootReducer = combineReducers({
    auth: authReducer,
    campaigns: campaignsReducer,
});

export default rootReducer;
