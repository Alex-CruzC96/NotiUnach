import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css"
import { useState } from "react";
import { useAuth } from "../../assets/auth/AuthProvider";
import { API_URL } from "../../assets/auth/constants";

export default function Login() {

    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const auth=useAuth();
    const goTo=useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mail,
                    password
                })
            });

            if (response.ok) {
                console.log("El usuario se autenticó correctamente!!!");
                setErrorResponse('');
                
                //Llamada a handleLogin para manejar el login
                

                goTo("/home");
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
                            <Form className="text-start" onSubmit={handleSubmit}>
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
                                            {errorResponse && 
                                            <Alert variant='danger'>
                                                {errorResponse}
                                            </Alert>
                                            }

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