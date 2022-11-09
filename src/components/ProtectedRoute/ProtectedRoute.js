import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({children, ...props}) {
    return (
        <Route>
            {() => props.loggedIn ? <>{children}</> : <Redirect to='/' />}
        </Route>
    )
}

export default ProtectedRoute;