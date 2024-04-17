import React, { useEffect } from "react";
import { Route} from "react-router-dom";
import { useUserContext } from '../context/authContext';

export default function UnauthenticatedRoute({ children, ...rest }) {
    const { isAuthenticated, logout} = useUserContext();

    useEffect(() => {
        if(isAuthenticated())
            logout();
    }, [isAuthenticated, logout])

    return (
        <Route {...rest}>
            {children}
        </Route>
  );
}