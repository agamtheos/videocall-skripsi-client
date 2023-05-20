import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Fallback from "../../../components/Fallback";

export default memo(({ match }) => {
    return (
        <Suspense fallback={<Fallback />}>
            <Switch>
                <Route
                    path={`${match.url}/admin`}
                    component={lazy(() => import("./CallPage"))}
                />
                <Route
                    path={`${match.url}/user`}
                    component={lazy(() => import("./HomePage"))}
                />
                <Route
                    path={`${match.url}/test1`}
                    component={lazy(() => import("./RoomPage"))}
                />
                <Route
                    path={`${match.url}/test2`}
                    component={lazy(() => import("./VideoCallPage"))}
                />
            </Switch>
        </Suspense>
    );
});
