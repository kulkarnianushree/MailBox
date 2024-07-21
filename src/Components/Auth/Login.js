import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Authaction } from "../../Store/auth";

const LogIn = ({ toggleAuthMode }) => {
    const [UserDetails, setUserDetails] = useState({
        Email: '',
        Password: ''
    });
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
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
                setAlert({ show: true, variant: 'success', message: 'Successfully logged in' });
            } catch (error) {
                setAlert({ show: true, variant: 'danger', message: error.message });
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={4}>
                    <div className="border p-4 rounded">
                        <h3 className="form-heading text-center mb-4">Log In</h3>
                        {alert.show && (
                            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                                {alert.message}
                            </Alert>
                        )}
                        <Form onSubmit={LogInHandler}>
                            <Form.Group controlId="Email" className="form-group mb-3">
                                <Form.Label className="form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Your Email Id"
                                    onChange={EmailChangeHandler}
                                    value={UserDetails.Email}
                                    autoComplete="off"
                                    required
                                    className="form-control"
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className="form-group mb-3">
                                <Form.Label className="form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Your Password"
                                    onChange={PasswordChangeHandler}
                                    value={UserDetails.Password}
                                    required
                                    className="form-control"
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="button" variant="link" className="btn btn-link mt-3">Forgot Password</Button>
                            </div>
                            <div className="text-center">
                                <Button type="submit" variant="primary" className="btn mt-3">Log In</Button>
                            </div>
                        </Form>
                        <Button type="button" variant="secondary" className="btn mt-3" onClick={toggleAuthMode}>
                            Create Account
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LogIn;
