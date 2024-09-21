import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ImgProfile from './ImgProfile'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faSun , faMoon } from '@fortawesome/free-solid-svg-icons'

function Header({user, darkMode, setDarkMode}){
    return(
        <>
            <Container fluid className='pt-4'>
                <Row>
                    <Col>
                        <Image fluid src={ImgProfile+user} roundedCircle id='user-Profile'/>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end pe-4'>
                        <Button className='bg-transparent border-0 p-0' onClick={setDarkMode}>
                            {!darkMode ? <FontAwesomeIcon icon={faSun} size='2xl' color='#000000'/> : <FontAwesomeIcon icon={faMoon} size='2xl' color='#FFFFFFF'/>}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export	default Header;