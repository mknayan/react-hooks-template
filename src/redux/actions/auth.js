import { TYPES } from '../types/index';
import auth from '../../utils/auth/auth';
import { SET_STORAGE, USER, REMOVE_STORAGE } from '../../config/constant'

/**
 * Define all the actions depending on modules
 */

const initialState = {
    token: null,
    user: {}
}

export const initUserAuthentication = info => {
    auth.login(function () {
        return true;
    });
    SET_STORAGE(USER, JSON.stringify(info))
    return {
        type: TYPES.INIT_USER_AUTHENTICATION,
        payload: info
    }
}

export const logout = () => {
    auth.logout(function () {
        return true;
    });
    REMOVE_STORAGE(USER)
    return {
        type: TYPES.INIT_USER_AUTHENTICATION,
        payload: initialState
    }
}