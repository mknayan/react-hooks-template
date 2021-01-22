import { TYPES } from '../types/index';

/**
 * Define initial state
 */
const initialState = {
    token: null,
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.INIT_USER_AUTHENTICATION:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}