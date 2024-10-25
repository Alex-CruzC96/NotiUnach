import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const MakePublication=({dark})=>{
    return(
        <>
            <Container fluid className="pt-4">
                <Row>
                    <Col>
                        <p>HOLA MUNDO!!!!</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MakePublication;