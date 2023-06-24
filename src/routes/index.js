import React, {memo, Suspense, lazy} from "react";
import {Route, Switch, Redirect, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import Fallback from "../components/Fallback";

const RestrictedRoute = ({component: Component, location, isValid, ...rest}) =>
    <Route {...rest}
        render={(props) =>
        isValid ? <Component {...props} />
        : <Redirect to={{
            pathname: '/auth/login',
            state: {from: location}
            }}/>
    }/>;

export default memo(({match}) => {
    const location = useLocation(); 

    const {isValid} = useSelector(state => state.auth);

    return(
        <Suspense fallback={<Fallback/>}>
            <Switch>
                <Route path={`${match.url}auth`} component={lazy(() => import('./Auth'))}/>
                <RestrictedRoute path={`${match.url}`} isValid={isValid} location={location} component={lazy(() => import('./Main'))}/>
            </Switch>
        </Suspense>
    )
});