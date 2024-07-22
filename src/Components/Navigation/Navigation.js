import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
    const LoginStatus = useSelector((state) => state.auth.LoginStatus);

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
                                <NavLink to="/Mail" className="nav-link">
                                    Mailbox
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
