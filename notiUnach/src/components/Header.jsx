import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ImgProfile from './ImgProfile'
import { Link } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faSun , faMoon } from '@fortawesome/free-solid-svg-icons'
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../assets/auth/AuthProvider";

function Header({darkMode, setDarkMode, getPosts}){
    const { user }=useAuth();

    const userProfilePicture = user?.profilePicture && !user.profilePicture.error 
    ? `../../backend/${user.profilePicture}` 
    : `${ImgProfile}google/unavatar.io`;

    const variant=darkMode?'dark':'light';
    return(
        <>
            <Container fluid className='pt-4'>
                <Row>
                    <Col>
                        <Link to="/perfil">
                            <Image fluid src={userProfilePicture} roundedCircle id='user-Profile'/>
                        </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end pe-4'>
                        <Button variant={variant} onClick={getPosts} className='bg-transparent border-0 me-2'>
                            <FontAwesomeIcon icon={faRotateRight} size='2xl'/>
                        </Button>
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