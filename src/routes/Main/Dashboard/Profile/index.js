import React, { memo, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Fallback from "../../../../components/Fallback";

export default memo(({match}) => (
    <Suspense fallback={<Fallback />}>
        <Switch>
            <Route path={`${match.url}/change-password`} component={lazy(() => import("./ChangePassword"))} />
        </Switch>
    </Suspense>
));