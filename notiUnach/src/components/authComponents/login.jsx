import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import "./login.css"
import { useState } from "react";
import { useAuth } from "../../assets/auth/AuthProvider";

export default function Login() {

    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
    const auth=useAuth();

    if(auth.isAuth){
        return(
            <Navigate to="/home"/>
        );
    }

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
                                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={mail} onChange={(e)=>setMail(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu constraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Row>
                                        <Col>
                                            <Form.Check type="checkbox" label="Recordarme" className=""/>
                                        </Col>
                                        <Col className="text-end">
                                            <Link to="/signup"><p>Registrarme</p></Link>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit">
                                                Iniciar sesión
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link>
                                                <p className="mt-2">Olvidé mi contraseña</p>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}