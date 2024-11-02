import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/esm/Image";
import ImgProfile from "./ImgProfile";
import './Comment.css';

const Comment = ({ name, lastName , date, profilePicture, content })=>{

    const profile_picture= `../../backend/${profilePicture}` || ImgProfile+'google/unavatar.io';

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    return (
        <>
            <Container fluid className="comment">
                <Row>
                    <Col>
                        <Image fluid roundedCircle src={profile_picture} className="img-user"/>
                        <div className="d-inline-block ps-2">
                            <div>
                                <p className="fs-6 m-0 me-2 d-inline">{name+' '+lastName}</p>
                                <nav className="d-inline date">{formatDate(date)}</nav>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="ck-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Comment;