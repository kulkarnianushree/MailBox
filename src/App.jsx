import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
          <Route path="*" element={<AuthPage/>}/>
        </Routes>
      </Router>
  
    </React.Fragment>
  );
}

export default App;
