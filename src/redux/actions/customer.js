import axios from 'axios';
import { TYPES } from '../types/index';
import { CONSTANT } from '../../config/constant';

/**
 * Define all the actions depending on modules
 */

export function loadCustomerData(config) {
    return (dispatch) => {
        const request = axios.get('/dashboard/info');
        request.then(response => {
            if (response.data.result.result == true) {
                dispatch(updateCustomerData(response.data.result.data.customer));
                if (config.redirect == true) {
                    window.redirect = "somewhere";
                }
            }
        }).catch(error => {
            let errorMsg = error.response === undefined ? 'Error Occured' : error.response.statusText;
            console.log(error);
        });
    }
}

export const updateCustomerData = info => {
    return {
        type: TYPES.UPDATE_CUSTOMER_DATA,
        payload: info
    }
}
