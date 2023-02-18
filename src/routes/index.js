import React, {memo, useState, useEffect, Suspense, lazy} from "react";
// import {useSelector} from "react-redux";
import {Route, Switch, Redirect, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateWindowWidth} from '@actions'
import Fallback from "@components/Fallback";
import {userVerifyToken} from "@actions/Auth"

// const RestrictedRoute = ({component: Component, location: isValid, ...rest}) => 
//     <Route {...rest}
//     render={(props) =>
//         isValid ? <Component {...props} />
//         : <Redirect to={{
//             pathname: '/auth/login',
//             state: {from: location}
//         }}/>
//     }/>;

export default memo(({match}) => {
    const dispatch = useDispatch();
    // const location = useLocation(); 

    const [verifyFetched, setVerifyFetched] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(userVerifyToken());
            } catch (error) {
                // do nothing
            } finally {
                setVerifyFetched(true);
            }
        })();

        window.addEventListener('resize', () => dispatch(updateWindowWidth(window.innerWidth)));
    }, [dispatch]);

    // const {isValid} = useSelector(state => state.auth);

    if (!verifyFetched) return <Fallback/>;

    return(
        <Suspense fallback={<Fallback/>}>
            <Switch>
                <Route path={`${match.url}auth`} component={lazy(() => import('./Auth'))}/>
            </Switch>
        </Suspense>
    )
});