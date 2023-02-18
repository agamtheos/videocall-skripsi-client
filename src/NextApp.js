// import { useMemo, useState } from "react";
// import LoginForm from "./components/login/loginForm";
// import VideoCallPage from "./components/videoCallPage/videoCallPage";
// import { AuthProvider } from "./context/authContext";

// function App() {
//   const [authData, setAuthData] = useState({username: "", token: "", isAuthenticated: false});

//   const AuthDataValue = useMemo(() => {
//     return authData
//   }, [authData]);

//   const changeAuthDataValue = (newVal) => {
//     setAuthData((prevVal) => {
//       return{...prevVal, ...newVal};
//     })
//   }

//   return (
//     <AuthProvider value={{AuthDataValue, changeAuthDataValue}}>
//     <div className="page">
//       <LoginForm /> 
//     </div>
//     </AuthProvider>
//   );
// }

// export default App;


import React from "react";
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from "react-router-dom";

import store, {history} from './appRedux/store';
import App from './routes/index';

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
	    <Switch>
	      <Route path="/" component={App}/>
	    </Switch>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
