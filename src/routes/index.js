import React, {memo, useState, useEffect, Suspense, lazy} from "react";
import {Route, Switch, Redirect, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateWindowWidth} from '../appRedux/actions'
import Fallback from "../components/Fallback";
// import {userVerifyToken} from "../appRedux/actions/Auth"

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
    // const dispatch = useDispatch();
    const location = useLocation(); 

    // const [verifyFetched, setVerifyFetched] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             await dispatch(userVerifyToken());
    //         } catch (error) {
    //             // do nothing
    //         } finally {
    //             setVerifyFetched(true);
    //         }
    //     })();

    //     window.addEventListener('resize', () => dispatch(updateWindowWidth(window.innerWidth)));
    // }, [dispatch]);

    const {isValid} = useSelector(state => state.auth);
    // if (!verifyFetched) return <Fallback/>;

    return(
        <Suspense fallback={<Fallback/>}>
            <Switch>
                <Route path={`${match.url}auth`} component={lazy(() => import('./Auth'))}/>
                {/* <Route path={`${match.url}`} component={lazy(() => import('./Main'))}/> */}
                <RestrictedRoute path={`${match.url}`} isValid={isValid} location={location} component={lazy(() => import('./Main'))}/>
            </Switch>
        </Suspense>
    )
});