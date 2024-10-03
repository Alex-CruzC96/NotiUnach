import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Settings.css'

const Settings=()=>{

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Configuración</p>

                <Row className="mt-5 mx-2 p-3 text-start setting-option">
                    <Col>
                        <div className="border border-2 rounded-circle d-inline-flex align-items-center justify-content-center circulo-opcion">
                            <FontAwesomeIcon icon={faUser} size="lg"/>
                        </div>
                        <span className="ms-3 d-inline-block">
                            <p className="fs-5 m-0">Configuración de usuario</p>
                        </span>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Settings