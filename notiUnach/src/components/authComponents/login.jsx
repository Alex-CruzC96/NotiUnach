import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./login.css"

export default function Login() {
    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center" id="cajaContenedora">
                <div id="caja">
                    <Row className="row-cols-1 text-center">
                        <Col>
                            <FontAwesomeIcon icon={faCircleUser} id="userIcon" />
                        </Col>
                        <Col className="mt-3">
                            <Form className="text-start">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu constraseña" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Recordarme" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}