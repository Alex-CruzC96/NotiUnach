import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass , faGear , faHouse , faBell , faPlusCircle} from '@fortawesome/free-solid-svg-icons'

function Footer(){
    return(
        <>
            <Container fluid className='text-center' id='contenedor'>
                <Row>
                    <Col className='mt-3 mb-2 option'>
                        <Link to="/home" className='no-decoration'>
                            <FontAwesomeIcon icon={faHouse}/>
                        </Link>
                    </Col>
                    <Col className='mt-3 mb-2 option'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </Col>
                    <Col className='mt-3 mb-2 option'>
                        <Link to="/crear-publicacion" className='no-decoration'>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                        </Link>
                    </Col>
                    <Col className='mt-3 mb-2 option'>
                        <Link to="/notificaciones" className='no-decoration'>
                            <FontAwesomeIcon icon={faBell}/>
                        </Link>
                    </Col>
                    <Col className='mt-3 mb-2 option'>
                        <Link to="/configuracion" className='no-decoration'>
                            <FontAwesomeIcon icon={faGear}/>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Footer;