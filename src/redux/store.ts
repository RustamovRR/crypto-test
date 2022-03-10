

import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';

const getMiddleware = () => applyMiddleware(thunk)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));
export default store