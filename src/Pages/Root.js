// Root.js
import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import Header from "../Components/Header/Header";
import Extraitems from "../Components/Navigation/Extraitems";
import { useSelector } from "react-redux";

const Root = () => {
    const LoginStatus = useSelector(state => state.auth.LoginStatus)
    return (
        <div>
            {LoginStatus && <Header />}
            <div className="main-layout">
                <Navigation />
                <Extraitems/>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;
