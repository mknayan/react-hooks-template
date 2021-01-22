import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Redux store to be used project wise
 *
 * @author Fahad Bin Wahid <fahad@instabd.com>
 */
export default createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(logger, thunk))
);
