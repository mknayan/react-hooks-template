import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { ProtectedRoute } from './utils/auth/protected.route';
import ModuleRoutes from './config/routes';
import PageNotFound from './utils/templates/layout/pagenotfound';

function App() {
	// console.log('ModuleRoutes', ModuleRoutes);
	return (
		<div>
			<Switch>
				{ModuleRoutes.map(modules => {
					return modules.map(module => {
						if (module.isProtected) {
							return (<ProtectedRoute {...module} exact key={module.path} />)
						} else {
							return (<Route {...module} exact key={module.path} />)
						}
					})
				})}
				<Route path="*" component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default withRouter(App);
