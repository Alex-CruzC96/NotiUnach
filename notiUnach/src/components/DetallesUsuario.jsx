import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const DetalleUsuario = ({dark}) => {

    //Necesarias para modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container fluid className="pt-4">
                <Row className="row-cols-1">
                    <Col>
                        <p className="fs-4">Actualizar foto de perfil</p>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" data-bs-theme={dark?'dark':'light'}/>
                        </Form.Group>
                    </Col>
                    <Col className="">
                        <Button variant="secondary" onClick={handleShow}>Elegir imagen previamente subida</Button>{' '}
                    </Col>
                </Row>

            </Container>

            <Modal show={show} onHide={handleClose} data-bs-theme={dark?'dark':'light'} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Elige una foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar cambio
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default DetalleUsuario