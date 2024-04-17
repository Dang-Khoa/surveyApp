import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/authContext';

function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, isAdmin } = useUserContext();
  const { pathname, search } = useLocation();

  return (
    <Route {...rest}>
        {isAdmin() ? (
            children
        ) : (isAuthenticated() ? (
                <Redirect to={
                    `/?redirect=${pathname}${search}`
                } />
            ) : (
                <Redirect to={
                    `/signin?redirect=${pathname}${search}`
                } />
            )
        )}
    </Route>
  );
}

export default AuthenticatedRoute;