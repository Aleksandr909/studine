import { createStore, combineReducers, applyMiddleware } from "redux";
import { appReducer } from "./reducers/appReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  app: appReducer
});

export default createStore(reducers, applyMiddleware(thunk));
