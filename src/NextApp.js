import React from "react";
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from "react-router-dom";

import store, {history} from './appRedux/store'
import App from './routes'
import "./assets/vendors/style";
import "./styles/wieldy.less";

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
	    <Switch>
	      <Route path="/" component={App}/>
	    </Switch>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
