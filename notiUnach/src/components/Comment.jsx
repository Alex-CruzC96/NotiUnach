import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";
import ImgProfile from "./ImgProfile";
import './Comment.css';

const Comment = ({ name, lastName , date, profilePicture, content })=>{
    return (
        <>
            <Container fluid className="comment">
                <Row>
                    <Col>
                        <Image fluid roundedCircle src={ImgProfile+'google/unavatar.io'} className="img-user"/>
                        <div className="d-inline-block ps-2">
                            <div>
                                <p className="fs-6 m-0 me-2 d-inline">{name+' '+lastName}</p>
                                <nav className="d-inline date">{date}</nav>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="eti m-0">Hola mundo!!</p>
                        <p className="eti m-0">Hola mundo!!</p>
                        <p className="eti m-0">Hola mundo!!</p>
                        <p className="eti m-0">Hola mundo!!</p>
                        <p className="eti m-0">Hola mundo!!</p>
                        <p className="eti m-0">Hola mundo!!</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Comment;