import { combineReducers } from 'redux';
import auth from './auth';

/**
 * Combine all the reducers from different modules to one
 *
 * @author Fahad Bin Wahid <fahad@instabd.com>
 */
const rootReducer = combineReducers({
    auth
});

export default rootReducer;
