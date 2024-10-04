import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';

const DetalleUsuario=()=>{

    return (
        <>
            <Container fluid className="pt-4">
                <Row className="row-cols-1">
                    <Col>
                        <p className="fs-4">Actualizar foto de perfil</p>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" className="bg-transparent archive"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        asdasd
                    </Col>
                </Row>
                
            </Container>
        
        </>
    );
}

export default DetalleUsuario