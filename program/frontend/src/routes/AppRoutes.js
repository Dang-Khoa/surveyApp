import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

import {
  Home, Signin, Signup, Settings, NotFound, ResetPassword,
  ChangeEmail, ChangeUsername, ChangePassword, Survey,
} from '../pages/index.js';

function AppRoutes() {
	return (
		<Switch>
			<UnauthenticatedRoute exact path="/signin">
				<Signin />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path="/signin/reset">
				<ResetPassword />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path="/signup">
				<Signup />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path="/signup/:userId">
				<Signup />
			</UnauthenticatedRoute>
			<AuthenticatedRoute exact path="/">
				<Home />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/settings">
				<Settings />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/settings/email">
				<ChangeEmail />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/settings/username">
				<ChangeUsername />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/settings/password">
				<ChangePassword />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/surveys/:surveyId">
				<Survey />
			</AuthenticatedRoute>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default AppRoutes;