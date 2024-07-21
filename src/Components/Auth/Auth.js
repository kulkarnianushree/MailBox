import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Authaction } from "../../Store/auth";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [UserDetails, setUserDetails] = useState({
        Email: '',
        Password: '',
        CP: ''
    });
    const dispatch = useDispatch();

    const EmailChangeHandler = (event) => {
        setUserDetails((PrevDetails) => ({
            ...PrevDetails,
            Email: event.target.value
        }));
    };

    const PasswordChangeHandler = (event) => {
        setUserDetails((PrevDetails) => ({
            ...PrevDetails,
            Password: event.target.value
        }));
    };

    const confirmPasswordHandler = (event) => {
        setUserDetails((PrevDetails) => ({
            ...PrevDetails,
            CP: event.target.value
        }));
    };

    const SignUpHandler = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (UserDetails.Email.trim().length > 0 && UserDetails.Password.trim().length > 4 && UserDetails.Password === UserDetails.CP) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0lxpD2HcsWtuNWodkT4tzDVTM7nGtsKo', {
                    method: "POST",
                    body: JSON.stringify({
                        email: UserDetails.Email,
                        password: UserDetails.Password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                dispatch(Authaction.Login(data.idToken));
                alert('Successfully sent the data');
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const LogInHandler = async (event) => {
        event.preventDefault(); 
        if (UserDetails.Email.trim().length > 0 && UserDetails.Password.trim().length > 4) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0lxpD2HcsWtuNWodkT4tzDVTM7nGtsKo', {
                    method: "POST",
                    body: JSON.stringify({
                        email: UserDetails.Email,
                        password: UserDetails.Password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                dispatch(Authaction.Login(data.idToken));
                alert('Successfully logged in');
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    return (
        <div>
            {isSignUp ? (
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <div className="border p-4 rounded">
                                <h3 className="text-center mb-4">Sign Up</h3>
                                <Form onSubmit={SignUpHandler} className="addUserForm">
                                    <Form.Group controlId="Email" className="mb-3">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Your E-Mail Id"
                                            onChange={EmailChangeHandler}
                                            value={UserDetails.Email}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Your Password"
                                            onChange={PasswordChangeHandler}
                                            value={UserDetails.Password}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Confirm" className="mb-3">
                                        <Form.Label>Confirm Password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Re-write The Password Here"
                                            onChange={confirmPasswordHandler}
                                            value={UserDetails.CP}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button type="submit" variant="primary">Sign Up</Button>
                                    </div>
                                </Form>
                                <Button type="button" variant="secondary" className="mt-3" onClick={toggleAuthMode}>
                                    Already Have an Account
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <div className="border p-4 rounded">
                                <h3 className="text-center mb-4">Log In</h3>
                                <Form onSubmit={LogInHandler}>
                                    <Form.Group controlId="Email" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Your Email Id"
                                            onChange={EmailChangeHandler}
                                            value={UserDetails.Email}
                                            autoComplete="off"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Your Password"
                                            onChange={PasswordChangeHandler}
                                            value={UserDetails.Password}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button type="button" variant="link" className="mt-3">Forgot Password</Button>
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" variant="primary" className="mt-3">Log In</Button>
                                    </div>
                                </Form>
                                <Button type="button" variant="secondary" className="mt-3" onClick={toggleAuthMode}>
                                    Create Account
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default Auth;
