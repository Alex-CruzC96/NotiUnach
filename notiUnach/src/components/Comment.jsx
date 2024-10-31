import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";
import ImgProfile from "./ImgProfile";
import './Comment.css';

const Comment = ()=>{
    return (
        <>
            <Container fluid className="comment">
                <Row>
                    <Col>
                        <Image fluid roundedCircle src={ImgProfile+'google/unavatar.io'} className="img-user"/>
                        <div className="d-inline-block ps-2">
                            <p className="fs-6 m-0">Nombre</p>
                        </div>
                    </Col>
                </Row>
                <p className="eti">Hola mundo!!</p>
            </Container>
        </>
    );
}

export default Comment;