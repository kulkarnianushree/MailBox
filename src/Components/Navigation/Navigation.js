import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navigation = () => {
    const LoginStatus = useSelector((state) => state.auth.LoginStatus);
    const user = useSelector(state => state.auth.user);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <ul className="navbar-nav">
                    {LoginStatus && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Welcome" className="nav-link">
                                    Welcome
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Inbox" className="nav-link">
                                    Inbox
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/All" className="nav-link">
                                    All mail
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Compose" className="nav-link">
                                    Compose
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Sent" className="nav-link">
                                    Sent
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Bin" className="nav-link">
                                    Bin
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                {LoginStatus && (
                    <div className="d-flex align-items-center">
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography variant="body1" className="ml-2">
                            {user}
                        </Typography>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
