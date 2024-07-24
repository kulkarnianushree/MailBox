import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";

const Mail = () => {
  const [UserMessage, setUserMessage] = useState({
    To: '',
    Subject: '',
    Text: ''
  });
  const From = useSelector(state => state.auth.user); // Get the user email from the Redux state
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ variant: '', message: '' });

  const ToChangeHandler = (event) => {
    setUserMessage((prev) => ({
      ...prev,
      To: event.target.value
    }));
  };

  const SubjectChangeHandler = (event) => {
    setUserMessage((prev) => ({
      ...prev,
      Subject: event.target.value
    }));
  };

  const TextChangeHandler = (event) => {
    setUserMessage((prev) => ({
      ...prev,
      Text: event.target.value
    }));
  };

  const SendButtonHandler = async (event) => {
    event.preventDefault();
    if (UserMessage.To.trim().length > 0) {
      try {
        await db.collection('email').add({
          To: UserMessage.To,
          From: From, // Include the user's email
          Subject: UserMessage.Subject,
          Text: UserMessage.Text,
          Time: firebase.firestore.FieldValue.serverTimestamp()
        });
        setUserMessage({
          To: '',
          Subject: '',
          Text: ''
        });
        setAlert({ variant: 'success', message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error); // Log the error
        setAlert({ variant: 'danger', message: 'Error sending email: ' + error.message });
      }
    } else {
      setAlert({ variant: 'warning', message: 'Please fill in the recipient\'s email address.' });
    }
  };

  const DeleteHandler = () => {
    navigate('/Welcome');
  };

  return (
    <div className="p-4 bg-light rounded">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="bg-white p-4 border rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="font-weight-bold">New Message</div>
                <Button type="button" onClick={DeleteHandler} variant="dark">Close</Button>
              </div>
              {alert.message && (
                <Alert variant={alert.variant}>
                  {alert.message}
                </Alert>
              )}
              <Form>
                <Form.Group controlId="EmailT">
                  <Form.Label className="font-weight-bold">To</Form.Label>
                  <Form.Control
                    type="email"
                    id="EmailT"
                    onChange={ToChangeHandler}
                    value={UserMessage.To}
                    placeholder="Recipient's email"
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group controlId="Subject">
                  <Form.Label className="font-weight-bold">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    id="Subject"
                    onChange={SubjectChangeHandler}
                    value={UserMessage.Subject}
                    placeholder="Subject of the email"
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group controlId="Text">
                  <Form.Label className="font-weight-bold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="Text"
                    onChange={TextChangeHandler}
                    value={UserMessage.Text}
                    placeholder="Write your message here"
                    rows={6}
                    className="mb-3"
                  />
                </Form.Group>
                <Button
                  type="button"
                  variant="primary"
                  onClick={SendButtonHandler}
                  className="w-100"
                >
                  Send
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Mail;
