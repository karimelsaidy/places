import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import placesReducer from './placesReducer';

const store = createStore(
  combineReducers({
    places: placesReducer,
  }),
  applyMiddleware(Thunk),
);

export default store;
