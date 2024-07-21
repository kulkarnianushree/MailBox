import React, { useState } from "react";
import SignUp from "./Signup";
import LogIn from "./Login";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    return (
        <div>
            {isSignUp ? (
                <SignUp toggleAuthMode={toggleAuthMode} />
            ) : (
                <LogIn toggleAuthMode={toggleAuthMode} />
            )}
        </div>
    );
};

export default Auth;
