import { combineReducers } from 'redux';

import ordersReducer from "./Reducer";

let combinedReducer=combineReducers({
    orders: ordersReducer, // редьюсер oredrsReducer отвечает за раздел state под именем orders
    // + другие редьюсеры
});

export default combinedReducer;
