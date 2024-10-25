import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CK from "./CkEditor/CK"

const MakePublication=({dark})=>{
    return(
        <>
            <Container fluid className="pt-4">
                <Row>
                    <Col>
                        <CK/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MakePublication;