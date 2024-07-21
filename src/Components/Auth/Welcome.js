import { Container, Row, Col } from "react-bootstrap";

const Welcome = () => {
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
        </div>
    );
};

export default Welcome;
