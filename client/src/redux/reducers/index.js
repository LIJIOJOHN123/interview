import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import datareducer from "./datareducer";

export const init = () => {
  const reducers = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    data: datareducer
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
