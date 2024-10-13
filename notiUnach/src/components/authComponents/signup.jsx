import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import './signup.css'
import { useState } from "react";
import { useAuth } from "../../assets/auth/AuthProvider";
import { API_URL } from "../../assets/auth/constants"

export default function SignUp() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const auth = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    mail,
                    password
                })
            });

            if (response.ok) {
                console.log("El usuario se creó bien!!");
                setErrorResponse('');
            }
            else {
                console.log("Ha ocurrido un error");
                const json = await response.json();
                if (json.body && json.body.error) {
                    setErrorResponse(json.body.error);
                } else {
                    setErrorResponse('Error desconocido');
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuth) {
        return (
            <Navigate to="/home" />
        );
    }

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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-1" controlId="formGroupName">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese su nombre" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupLastname">
                                    <Form.Label>Apellido de usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese sus apellidos" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={mail} onChange={(e) => { setMail(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGroupConfirmPassword">
                                    <Form.Label>Confirmar contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="text-center mt-2">
                                    <Row>
                                        <Col>
                                            {errorResponse && 
                                            <Alert variant='danger'>
                                                {errorResponse}
                                            </Alert>
                                            }

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