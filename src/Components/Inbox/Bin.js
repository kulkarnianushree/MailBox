import React,{useState} from 'react'
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mailaction } from '../../Store/mail';
const Bin = () => {
  const BinMessages = useSelector(state=>state.mail.Binlist)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const toggleMessage = (id) => {
    dispatch(Mailaction.markAsRead(id));
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };
  const backButtonHandler = () => {
    navigate('/Welcome');
  };
  return (
    <Container className="mt-5">
      <Button type="button" onClick={backButtonHandler} variant="secondary" className="mb-3">Back</Button>
      {BinMessages.length === 0 ? (
        <div>No Messages are there in Bin.</div>
      ) : (
        <Row>
          <Col>
            <ListGroup>
              {BinMessages.map((message) => (
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
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Bin