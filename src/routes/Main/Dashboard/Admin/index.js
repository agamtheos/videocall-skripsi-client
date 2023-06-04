import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Fallback from "../../../../components/Fallback";

export default memo(({match}) => (
    <Suspense fallback={<Fallback />}>
        <Switch>
            <Route path={`${match.url}/home`} component={lazy(() => import("./HomePage"))} />
            <Route path={`${match.url}/manage-user`} component={lazy(() => import("./ManageUser"))} />
        </Switch>
    </Suspense>
));