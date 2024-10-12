import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './signup.css'
import { useState } from "react";

export default function SignUp() {
    
    const [name,setName]=useState('');
    const [lastName,setLastName]=useState('');
    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPass,setConfirmPass]=useState('');

    return (
        <>
            <Container fluid id="cajaContenedora" className="d-flex justify-content-center align-items-center">
                <div id="caja">
                    <Row className="text-center">
                        <Col>
                            <FontAwesomeIcon icon={faCircleUser} id="userIcon" />
                        </Col>
                    </Row>

                    <Row className="mt-2 text-start">
                        <Col>
                            <Form>
                                <Form.Group className="mb-1" controlId="formGroupName">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese su nombre" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupLastname">
                                    <Form.Label>Apellido de usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese sus apellidos" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={mail} onChange={(e)=>{setMail(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupConfirmPassword">
                                    <Form.Label>Confirmar contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="text-center mt-2">
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit">
                                                Registrarme
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Link to="/">
                                                <p>¿Ya estás registrado?</p>
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