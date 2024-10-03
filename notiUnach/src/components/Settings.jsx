import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import './Settings.css'

const Settings=()=>{

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Configuración</p>

                <Row className="mt-5 mx-2 p-3 text-start setting-option">
                    <Col>Hola mundo</Col>
                </Row>
            </Container>
        </>
    );
}

export default Settings