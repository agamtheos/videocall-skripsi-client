import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Fallback from "../../../components/Fallback";

export default memo((props) => {
    const { match } = props;

    return (
        <Suspense fallback={<Fallback />}>
            <Switch>
                <Route
                    path={`${match.url}/admin`}
                    component={lazy(() => import("./Admin"))}
                />
                <Route
                    path={`${match.url}/client`}
                    component={lazy(() => import("./Client"))}
                />
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
            </Switch>
        </Suspense>
    );
});
