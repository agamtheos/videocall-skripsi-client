import React, { memo, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getDefaultRoute } from "../../util/features";
import Fallback from "../../components/Fallback";

export default memo(({ match }) => {
    const defaultRoute = getDefaultRoute();
    return (
    <Suspense fallback={<Fallback />}>
        <Switch>
            <Route
                path={`${match.url}dashboard`}
                component={lazy(() => import("./Dashboard"))}
            />
            {!!defaultRoute && <Redirect to={defaultRoute}/>}
        </Switch>
    </Suspense>
    );
});
