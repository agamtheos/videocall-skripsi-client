import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Fallback from "../../../../components/Fallback";

export default memo(({match}) => (
    <Suspense fallback={<Fallback />}>
        <Switch>
            <Route path={`${match.url}/home`} component={lazy(() => import("./HomePage"))} />
        </Switch>
    </Suspense>
));