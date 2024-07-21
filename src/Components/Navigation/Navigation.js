import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Authaction } from "../../Store/auth"; // Adjust import path as needed

const Navigation = () => {
    const LoginStatus = useSelector((state) => state.auth.LoginStatus);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(Authaction.Logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <ul className="navbar-nav">
                    {!LoginStatus ? (
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Welcome" className="nav-link">
                                    Welcome
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <Button type="button" variant="danger" onClick={logoutHandler} >
                                    Logout
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
