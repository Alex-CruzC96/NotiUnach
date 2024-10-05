import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import './DetallesUsuario.css'

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

            <Modal show={show} onHide={handleClose} data-bs-theme={dark?'dark':'light'} size="lg" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Elige una foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="images">
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/1004/1080/1350.jpg?hmac=0vpsS9YIEMV7guF8bv6iWcSesyNNMQPi2ufXB0cPazE"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/628/2509/1673.jpg?hmac=TUdtbj7l4rQx5WGHuFiV_9ArjkAkt6w2Zx8zz-aFwwY"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/646/2509/1673.jpg?hmac=HXykqhktw0TF08mbS0F3J4bxJJvJRQXG74xA4zPYW7Y"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/660/2508/1672.jpg?hmac=D_MkrRyzUZRYLOGoa4HJ1WJTfnzN0qshbCEPpaCoSuI"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/823/5000/3333.jpg?hmac=75sjFAfvXxelfFDFdlupCl2KDgIbyOOBTmvhcr6u0B8"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/996/4272/2848.jpg?hmac=yqRTUY4WFeUSayrtW0dHKMoWx8hd3NQw5TOOKaxZueY"/>
                        <Image className="imagesProfile" fluid src="https://fastly.picsum.photos/id/1033/1080/1350.jpg?hmac=aiwf66x-mo6f1rg4ph1DHO60ZcUH-BrC_6jzyybOCis"/>
                    </div>
                </Modal.Body>
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