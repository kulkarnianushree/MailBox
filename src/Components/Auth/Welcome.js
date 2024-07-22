import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate()
    const ComposeButtonHandler = () =>{
        navigate('/Mail')
    }

    return (
        <div className="welcome-container">
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6} className="text-center">
                        <div className="welcome-message border p-4 rounded">
                            <h3 className="mb-4">Welcome to the Mail Box</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Button type="button" onClick={ComposeButtonHandler} variant="primary">Compose Email</Button>
        </div>
    );
};

export default Welcome;
