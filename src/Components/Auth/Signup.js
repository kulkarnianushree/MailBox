import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const SignUp = ({ toggleAuthMode }) => {
    const [UserDetails, setUserDetails] = useState({
        Email: '',
        Password: '',
        CP: ''
    });
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

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
        event.preventDefault();
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
                console.log(data)
                setAlert({ show: true, variant: 'success', message: 'Successfully signed up' });
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
                        <h3 className="form-heading text-center mb-4">Sign Up</h3>
                        {alert.show && (
                            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                                {alert.message}
                            </Alert>
                        )}
                        <Form onSubmit={SignUpHandler} className="addUserForm">
                            <Form.Group controlId="Email" className="form-group mb-3">
                                <Form.Label className="form-label">E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Your E-Mail Id"
                                    onChange={EmailChangeHandler}
                                    value={UserDetails.Email}
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
                            <Form.Group controlId="Confirm" className="form-group mb-3">
                                <Form.Label className="form-label">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-write The Password Here"
                                    onChange={confirmPasswordHandler}
                                    value={UserDetails.CP}
                                    required
                                    className="form-control"
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit" variant="primary" className="btn">Sign Up</Button>
                            </div>
                        </Form>
                        <Button type="button" variant="secondary" className="btn mt-3" onClick={toggleAuthMode}>
                            Already Have an Account
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
