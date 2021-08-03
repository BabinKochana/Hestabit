import { combineReducers } from "redux";

import { CommonReducer } from "./common.reducer";

export const storeInitialState = {
};

const reducer = combineReducers({
    commonData: CommonReducer
});


const rootReducer = (state, action) => {
    return reducer(state, action);
};

export default rootReducer;
