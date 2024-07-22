import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import { useSelector } from "react-redux";
import WelcomePage from "./Pages/WelcomePage";
import MailPage from "./Pages/MailPage";
import SenderPage from "./Pages/SenderInputPage";

function App() {
  const LoginStatus = useSelector((state)=>state.auth.LoginStatus)
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={LoginStatus ? <WelcomePage/> : <AuthPage/>}/>
          <Route path="/Welcome" element={<WelcomePage/>}></Route>
          {LoginStatus && (<Route path="/Mail" element={<MailPage/>}></Route>)}
          {LoginStatus && <Route path="/Inbox" element={<SenderPage/>}></Route>}
          <Route path="*" element={<AuthPage/>}/>
        </Routes>
      </Router>
  
    </React.Fragment>
  );
}

export default App;
