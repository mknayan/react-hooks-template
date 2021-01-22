import React from 'react';
import Checklist from './../modules/checklist/config/routes';
import Auth from './../modules/auth/config/routes';
import Common from './../modules/common/config/routes';
import MyAccount from './../modules/myaccount/config/routes';

const ROUTES_LIST = {
    "auth": Auth,
    "checklist": Checklist,
    "myaccount": MyAccount,
    "": Common,
};

export default Object.keys(ROUTES_LIST).map((root_value, root_index) => {
    // console.log('root_value', root_value)
    return ROUTES_LIST[root_value].map((value, index) => {
        value.path = `/${root_value}${value.path}`;
        // console.log('value', value)
        return value;//{...value, ...{path: `/${root_value}${value.path}`}}
    })
});