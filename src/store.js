import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer, { storeInitialState } from "./redux/reducer";
import logger from "redux-logger";

let middleware = [thunk];

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

const enhancer =
    (process.env.NODE_ENV === "development" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    rootReducer,
    storeInitialState,
    enhancer(applyMiddleware(...middleware))
);

export default store;
