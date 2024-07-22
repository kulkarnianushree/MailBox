import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Mailaction } from '../../Store/mail';

const SenderInbox = () => {
  const messages = useSelector((state) => state.mail.Message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const BackButtonHandler = () => {
    navigate('/Mail');
  };

  const toggleMessage = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('https://mail-box-client-6cc6d-default-rtdb.firebaseio.com/mail.json');
        if (!response.ok) {
          throw new Error('No Messages are there');
        }
        const data = await response.json();
        const messageArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        dispatch(Mailaction.Message(messageArray));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMessage();
  }, [dispatch]);

  const DeleteButtonHandler = async (id) => {
    try {
      const response = await fetch(`https://mail-box-client-6cc6d-default-rtdb.firebaseio.com/mail/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      dispatch(Mailaction.Message(messages.filter((message) => message.id !== id)));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Button type="button" onClick={BackButtonHandler} variant="secondary" className="mb-3">Back</Button>
      <Row>
        <Col>
          <ListGroup>
            {messages.map((message) => (
              <ListGroup.Item key={message.id} className="mb-3">
                <Card>
                  <Card.Header as="h5">
                    <Button variant="light" onClick={() => toggleMessage(message.id)}>
                      {message.To}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => DeleteButtonHandler(message.id)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </Card.Header>
                  {expandedMessageId === message.id && (
                    <Card.Body>
                      <Card.Title>{message.Subject}</Card.Title>
                      <Card.Text>{message.Text}</Card.Text>
                    </Card.Body>
                  )}
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SenderInbox;
