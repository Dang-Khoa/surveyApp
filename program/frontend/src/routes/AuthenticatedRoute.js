import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/authContext';

function AuthenticatedRoute({ children, ...rest }) {
	const { isAuthenticated } = useUserContext();
	const { pathname, search } = useLocation();

	return (
		<Route {...rest}>
			{isAuthenticated() ? (
				children
			) : (
				<Redirect to={
				`/signin?redirect=${pathname}${search}`
				} />
			)}
		</Route>
	);
}

export default AuthenticatedRoute;