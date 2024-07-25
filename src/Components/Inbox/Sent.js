import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Mailaction } from '../../Store/mail';
import { db } from '../Firebase'; // Ensure correct path to your Firebase config

const SenderInbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const emails = useSelector(state => state.mail.Message);
  const sender = useSelector(state => state.auth.user);

  const sentMessages = emails.filter(email => email.data.From === sender);

  const handleBackButtonClick = () => {
    navigate('/Mail');
  };

  const toggleMessage = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  const StartButtonHandler = () => {
    navigate('/Compose');
  };

  if (sentMessages.length === 0) {
    return (
      <Button type='button' variant='primary' onClick={StartButtonHandler}>
        Start Conversation
      </Button>
    );
  }

  const DeleteHandlerButton = async (id) => {
    try {
      await db.collection('email').doc(id).delete();
      dispatch(Mailaction.DeleteMessage(id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Container className="mt-5">
      <Button
        type="button"
        onClick={handleBackButtonClick}
        variant="secondary"
        className="mb-3"
      >
        Back
      </Button>
      <Row>
        <Col>
          <ListGroup>
            {sentMessages.map((message) => (
              <ListGroup.Item key={message.id} className="mb-3">
                <Card>
                  <Card.Header as="h5">
                    <Button variant="light" onClick={() => toggleMessage(message.id)}>
                      to: {message.data.To}
                    </Button>
                  </Card.Header>
                  {expandedMessageId === message.id && (
                    <Card.Body>
                      <Card.Title>{message.data.Subject}</Card.Title>
                      <Card.Text>{message.data.Text}</Card.Text>
                    </Card.Body>
                  )}
                </Card>
                <IconButton onClick={() => DeleteHandlerButton(message.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SenderInbox;
