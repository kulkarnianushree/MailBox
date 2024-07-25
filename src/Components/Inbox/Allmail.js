import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mailaction } from '../../Store/mail';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../Firebase'; // Ensure correct path to your Firebase config

const Allmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Emails = useSelector(state => state.mail.Message);
  const Sender = useSelector(state => state.auth.user);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const Mail = Emails.filter(email => email.data.From === Sender || email.data.To === Sender);

  const BackButtonHandler = () => {
    navigate('/Welcome');
  };

  const toggleMessage = (id) => {
    dispatch(Mailaction.markAsRead(id));
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const snapshot = await db.collection('email').get();
        if (snapshot.empty) {
          throw new Error('No Messages are there.');
        }

        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
          isRead: doc.data().isRead || false
        }));

        dispatch(Mailaction.setMessage(messages));
      } catch (error) {
        alert(error.message);
      }
    }

    fetchEmails();
  }, [dispatch]);

  const DeleteButtonHandler = async (id) => {
    try {
      await db.collection('email').doc(id).delete();
      dispatch(Mailaction.DeleteMessage(id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  return (
    <Container className="mt-5">
      <Button type="button" onClick={BackButtonHandler} variant="secondary" className="mb-3">Back</Button>
      <Row>
        <Col>
          <ListGroup>
            {Mail.map((message) => (
              <ListGroup.Item key={message.id} className="mb-3">
                <Card>
                  <Card.Header as="h5">
                    {!message.isRead && (
                      <IconButton>
                        <FiberManualRecordIcon style={{color:'blue'}}></FiberManualRecordIcon>
                      </IconButton>
                    )}
                    <Button variant="light" onClick={() => toggleMessage(message.id)} style={{ fontWeight: !message.isRead ? 'bold' : 'normal' }}>
                      {message.data.From === Sender ? 'To: ' : 'From: '}
                      {message.data.From === Sender ? message.data.To : message.data.From}
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
                  <IconButton onClick={() => DeleteButtonHandler(message.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Allmail;
