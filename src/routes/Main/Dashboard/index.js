import React, { memo, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getDefaultRoute, roleable, DASHBOARD_ADMIN, DASHBOARD_CLIENT } from "../../../util/features";
import Fallback from "../../../components/Fallback";

export default memo((props) => {
    const { match } = props;
    const defaultRoute = getDefaultRoute();

    return (
            <Suspense fallback={<Fallback />}>
            <Switch>
                {/* {roleable(DASHBOARD_ADMIN) && <Route path={`${match.url}/admin`} component={lazy(() => import("./Admin"))} />}
                {roleable(DASHBOARD_CLIENT) && <Route path={`${match.url}/client`} component={lazy(() => import("./Client"))} />} */}
                {/* <Route
                    path={`${match.url}/admin`}
                    component={lazy(() => import("./Admin"))}
                /> */}
                {/* <Route
                    path={`${match.url}/client`}
                    component={lazy(() => import("./Client"))}
                /> */}
                <Route
                    path={`${match.url}/profile`}
                    component={lazy(() => import("./Profile"))}
                />
                <Route
                    path={`${match.url}/test1`}
                    component={lazy(() => import("./RoomPage"))}
                />
                <Route
                    path={`${match.url}/room`}
                    component={lazy(() => import("./VideoCallPage"))}
                />
                {/* {!!defaultRoute && <Redirect to={defaultRoute}/>} */}
            </Switch>
            </Suspense>
    );
});
