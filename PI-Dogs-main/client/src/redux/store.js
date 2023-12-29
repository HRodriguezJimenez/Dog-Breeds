import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// En esta linea vinculamos la api con el uso de la extención Redux_DEVTOOLS. 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // Este Middleware nos permite realizar las peticiones/request y manejarlas de manera asíncrona.
);

export default store;