"use strict";
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import combinedReducer from './Redux/reducers';
import thunk from 'redux-thunk';

import MainPage from './components/MainPage';




let store=createStore(combinedReducer, applyMiddleware(thunk));





ReactDOM.render(


        <Provider store={store}>
             <MainPage/>
         </Provider>

  , document.getElementById('container') 
);





export {store}
