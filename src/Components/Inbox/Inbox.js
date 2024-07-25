import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Mailaction } from '../../Store/mail';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { db } from '../Firebase';

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

  const DeleteHandler = async (id) => {
    try {
      await db.collection('messages').doc(id).delete();
      dispatch(Mailaction.DeleteMessage(id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

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
                      {!message.isRead && (
                        <IconButton>
                          <FiberManualRecordIcon style={{ color: 'blue' }}></FiberManualRecordIcon>
                        </IconButton>
                      )}
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
                  <IconButton onClick={() => DeleteHandler(message.id)}>
                    <DeleteIcon />
                  </IconButton>
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
