import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedSignRoute({children, ...props}) {
    return (
        <Route>
            {() => !props.loggedIn ? <>{children}</> : <Redirect to='/movies' />}
        </Route>
    )
}

export default ProtectedSignRoute;