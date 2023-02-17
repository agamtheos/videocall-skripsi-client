import { useMemo, useState } from "react";
import LoginForm from "./components/login/loginForm";
import VideoCallPage from "./components/videoCallPage/videoCallPage";
import { AuthProvider } from "./context/authContext";

function App() {
  const [authData, setAuthData] = useState({username: "", token: "", isAuthenticated: false});

  const AuthDataValue = useMemo(() => {
    return authData
  }, [authData]);

  const changeAuthDataValue = (newVal) => {
    setAuthData((prevVal) => {
      return{...prevVal, ...newVal};
    })
  }

  return (
    <AuthProvider value={{AuthDataValue, changeAuthDataValue}}>
    <div className="page">
      <LoginForm /> 
    </div>
    </AuthProvider>
  );
}

export default App;
