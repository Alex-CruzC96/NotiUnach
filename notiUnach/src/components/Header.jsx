import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Header(){
    return(
        <>
            <Container fluid className='pt-4'>
                <Row>
                    <Col xs={3} md={2} lg={1} className='ps-3 ps-md-4 ps-lg-5'>
                        <Image fluid src="https://unavatar.io/dribbble/omidnikrah" roundedCircle/>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end pe-4'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl'/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export	default Header;