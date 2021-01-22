import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { SET_STORAGE, GET_STORAGE, REMOVE_STORAGE, USER } from './config/constant'
import { initUserAuthentication } from './redux/actions/auth'

import App from './App';
import store from './redux/store';
import auth from './utils/auth/auth';
import { CONFIG } from './config/settings';
import * as serviceWorker from './serviceWorker';

/**
 * Default setup for axios - you can include default api-keys, base_url etc.
 */
axios.defaults.baseURL = CONFIG.API_BASE_URL;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
	// get authorized token before sending the request else send default token
	const token = auth.getToken();
	config.headers.common['Authorization'] = `Bearer ${token}`;
	return config;
}, function (error) { return Promise.reject(error); });

//local storage to store
const user = JSON.parse(GET_STORAGE(USER));
if (user) {
	if (user.token) {
		store.dispatch(initUserAuthentication(user));
	} else {
		REMOVE_STORAGE(USER);
	}
}

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</Router>,
	document.getElementById('root')
);
serviceWorker.unregister();
