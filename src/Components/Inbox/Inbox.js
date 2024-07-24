import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Mailaction } from '../../Store/mail';

const Inbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emails = useSelector(state => state.mail.Message);
  const sender = useSelector(state => state.auth.user);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const inboxMessages = emails.filter(email => email.data.To === sender);

  const backButtonHandler = () => {
    navigate('/Welcome');
  };

  const toggleMessage = (id) => {
    dispatch(Mailaction.markAsRead(id));
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  return (
    <Container className="mt-5">
      <Button type="button" onClick={backButtonHandler} variant="secondary" className="mb-3">Back</Button>
      {inboxMessages.length === 0 ? (
        <div>No Messages are there.</div>
      ) : (
        <Row>
          <Col>
            <ListGroup>
              {inboxMessages.map((message) => (
                <ListGroup.Item key={message.id} className="mb-3">
                  <Card>
                    <Card.Header as="h5">
                      {!message.isRead && <span style={{ color: 'blue', marginRight: '8px' }}>•</span>}
                      <Button variant="light" onClick={() => toggleMessage(message.id)} style={{ fontWeight: !message.isRead ? 'bold' : 'normal' }}>
                        from: {message.data.From}
                      </Button>
                    </Card.Header>
                    {expandedMessageId === message.id && (
                      <Card.Body>
                        <Card.Title>{message.data.Subject}</Card.Title>
                        <Card.Text>
                          {message.data.Text}
                        </Card.Text>
                      </Card.Body>
                    )}
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Inbox;
