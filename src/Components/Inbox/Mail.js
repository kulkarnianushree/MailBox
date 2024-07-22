import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Mail = () => {
  const [UserMessage, setUserMessage] = useState({
    To: '',
    Subject: "",
    Text: ''
  });

  const [alert, setAlert] = useState({ variant: '', message: '' });

  const ToChangeHandler = (event) => {
    setUserMessage((Prev) => ({
      ...Prev,
      To: event.target.value
    }));
  };

  const SubjectChangeHandler = (event) => {
    setUserMessage((Prev) => ({
      ...Prev,
      Subject: event.target.value
    }));
  };

  const TextChangeHandler = (event) => {
    setUserMessage((Prev) => ({
      ...Prev,
      Text: event.target.value
    }));
  };

  const SendButtonHandler = async () => {
    try {
      const response = await fetch('https://mail-box-client-6cc6d-default-rtdb.firebaseio.com/mail.json', {
        method: 'POST',
        body: JSON.stringify({
          To: UserMessage.To,
          Subject: UserMessage.Subject,
          Text: UserMessage.Text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }

      const data = await response.json();
      console.log(data);
      setAlert({ variant: 'success', message: 'Email sent successfully!' });

    } catch (error) {
      console.log(error.message);
      setAlert({ variant: 'danger', message: 'Failed to send email. Please try again.' });
    }
  };

  return (
    <div className="p-4 bg-light rounded">
      <NavLink to='/Inbox'>Inbox</NavLink>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="bg-white p-4 border rounded shadow-sm">
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
                    id='Subject'
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
                    id='Text'
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
