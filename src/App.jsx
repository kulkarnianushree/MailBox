import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import { useSelector } from "react-redux";
import WelcomePage from "./Pages/WelcomePage";

function App() {
  const LoginStatus = useSelector((state)=>state.auth.LoginStatus)
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={LoginStatus ? <WelcomePage/> : <AuthPage/>}/>
          <Route path="/Welcome" element={<WelcomePage/>}></Route>
          <Route path="*" element={<AuthPage/>}/>
        </Routes>
      </Router>
  
    </React.Fragment>
  );
}

export default App;
