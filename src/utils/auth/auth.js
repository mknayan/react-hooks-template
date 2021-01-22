/**
 * Authentication class to check, login, logout user into the system
 * This class mimics a singleton pattern
 * 
 * @author Fahad Bin Wahid <fahad@instabd.com>
 */

// TODO a lot of modification here

import { CONFIG } from './../../config/settings';
import { SET_STORAGE, GET_STORAGE, USER, REMOVE_STORAGE } from './../../config/constant';

class Auth {

    constructor() {
        this.authenticated = false;
        const auth = JSON.parse(GET_STORAGE(USER));
        if (auth) {
            if (auth.token) {
                this.authenticated = true;
            }
        }
        // const token = localStorage.getItem('token');

    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        // localStorage.removeItem('token');
        REMOVE_STORAGE(USER)
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getToken() {
        const auth = JSON.parse(GET_STORAGE(USER));
        if (auth) {
            if (auth.token) {
                return auth.token
            } else {
                return CONFIG.API_TOKEN
            }
        } else {
            return CONFIG.API_TOKEN
        }
        // return localStorage.getItem('token') ? localStorage.getItem('token') : CONFIG.API_TOKEN;
    }
}

export default new Auth();