import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './middleware';

import common from './reducers/common';
import home from './reducers/home';
import maintenance from './reducers/maintenance';
import contact from './reducers/contact';
import application from './reducers/application';
import {reducer as modalReducer} from 'react-redux-modal'

const reducer = combineReducers({
  common,
  home,
  maintenance,
  application,
  contact,
  modals: modalReducer
});

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, applyMiddleware(promiseMiddleware));


export default store;