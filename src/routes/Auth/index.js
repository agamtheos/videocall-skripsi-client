import React, {memo, Suspense, lazy, useEffect} from "react";
import {useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import Fallback from '../../components/Fallback'


export default memo(({match}) => {
    const history = useHistory();
    const {isValid} = useSelector(({auth}) => auth);

    useEffect(() => {
        if (isValid) history.push('/');
    }, [isValid, history]);

    return (
        <Suspense fallback={<Fallback/>}>
            <Switch>
                {/* <Route path={`${match.url}/login`} component={lazy(() => import('./Login'))}/> */}
                <Route path={`${match.url}/register`} component={lazy(() => import('./RegisterClient'))}/>
                {/* <Route path={`${match.url}/forgot-password`} component={lazy(() => import('./ForgotPassword'))}/> */}
                {/* <Route path={`${match.url}/reset-password`} component={lazy(() => import('./ResetPassword'))}/> */}
            </Switch>
        </Suspense>
    )
});