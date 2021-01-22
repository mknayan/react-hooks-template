/**
 * Class to protect route without authentication
 * 
 * @author Fahad Bin Wahid <fahad@instabd.com>
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from './../../config/constant';
import auth from './auth';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: {
                                from: props.location
                            }
                        }}
                    />;
                }
            }}
        />
    );
}