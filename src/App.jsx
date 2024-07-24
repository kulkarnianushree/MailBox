// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./Pages/AuthPage";
import WelcomePage from "./Pages/WelcomePage";
import ComposePage from "./Pages/ComposePage";
import SenderPage from "./Pages/SentPage";
import Root from "./Pages/Root";// Adjust the import path based on your project structure
import AllmailPage from "./Pages/AllmailPage";
import InboxPage from "./Pages/InboxPage";

function App() {
    const LoginStatus = useSelector((state) => state.auth.LoginStatus);
    return (
        <Router>
            <Routes>
                <Route path="/"  exact element={<Root />}>
                    <Route index element={LoginStatus ? <WelcomePage /> : <AuthPage />} />
                    <Route path="Welcome" element={<WelcomePage />} />
                    {LoginStatus && <Route path="Compose" element={<ComposePage />} />}
                    {LoginStatus && <Route path="Sent" element={<SenderPage />} />}
                    {LoginStatus && <Route path="All" element={<AllmailPage/>}/>}
                    {LoginStatus && <Route path="Inbox" element={<InboxPage/>}/>}
                    <Route path="*" element={<AuthPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
