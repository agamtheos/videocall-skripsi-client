import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Fallback from "../../../../../components/Fallback"

export default memo(({match}) => (
    <Suspense fallback={<Fallback />}>
        <Switch>
            <Route path={`${match.url}`} exact component={lazy(() => import("./List"))} />
            <Route path={`${match.url}/create`} exact component={lazy(() => import("./CreateOrUpdate"))} />
            <Route path={`${match.url}/update/:id`} exact component={lazy(() => import("./CreateOrUpdate"))} />
        </Switch>
    </Suspense>
));