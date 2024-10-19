import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../assets/auth/AuthProvider";
import './Settings.css'

const Settings=()=>{
    const auth=useAuth();

    async function logOut(){

        try{
            auth.handleLogout();

        }catch(error){
            console.error('Ha ocurrido un error inesperado: '+error);
        }
    }

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Configuración</p>

                {/* Esto es una opcion  */}
                <Link to={'/detalles-usuario'} className="no-decoracion d-block">
                    <Row className="mt-5 mx-2 p-3 text-start setting-option">
                        <Col>
                            <div className="border border-2 rounded-circle d-inline-flex align-items-center justify-content-center circulo-opcion">
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                            </div>
                            <span className="ms-3 d-inline-block">
                                <p className="fs-5 m-0">Configuración de usuario</p>
                            </span>
                        </Col>
                    </Row>
                </Link>

                <Row className="mt-4 mx-2 p-3 text-start setting-option" onClick={logOut}>
                    <Col>
                        <div className="border border-2 rounded-circle d-inline-flex align-items-center justify-content-center circulo-opcion" id="exit"> 
                            <FontAwesomeIcon icon={faCircleXmark} size="lg" color="#AF1A1A"/>
                        </div>
                        <span className="ms-3 d-inline-block">
                            <p className="fs-5 m-0" id="cerrarSesion">Cerrar sesión</p>
                        </span>
                    </Col>
                </Row>


            </Container>
        </>
    );
}

export default Settings