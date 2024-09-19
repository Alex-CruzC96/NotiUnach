import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function Footer(){
    return(
        <>
            <Container fluid className='text-center' id='contenedor'>
                <Row>
                    <Col className='mt-3 option'>
                        <FontAwesomeIcon icon={faBars}/>
                        <p className="fs-6">Categorías</p>
                    </Col>
                    <Col className='mt-3 option'>
                        <FontAwesomeIcon icon={faPlus}/>
                        <p className="fs-6">Publicar</p>
                    </Col>
                    <Col className='mt-3 option'>
                        <FontAwesomeIcon icon={faBell}/>
                        <p className="fs-6">Notificaciones</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Footer;