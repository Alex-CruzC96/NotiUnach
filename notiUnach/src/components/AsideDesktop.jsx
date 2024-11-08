import Image from "react-bootstrap/esm/Image"
import ImgProfile from "./ImgProfile"
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faMoon } from "@fortawesome/free-solid-svg-icons"
import { faSun } from "@fortawesome/free-solid-svg-icons"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import './AsideDesktop.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../assets/auth/AuthProvider";
import Button from "react-bootstrap/esm/Button"


const AsideDesktop = ({ darkMode, setDarkMode, getPosts }) => {
    //Variable que contendrá la foto de perfil
    const { user }=useAuth();

    const userProfilePicture = user?.profilePicture && !user.profilePicture.error 
    ? `../../backend/${user.profilePicture}` 
    : `${ImgProfile}google/unavatar.io`;

    //Variables que sirven para el renderizado de ciertos componentes y sus animaciones
    const [hoverInicio, setHoverInicio] = useState(false);
    const [hoverCat, setHoverCat] = useState(false);
    const [hoverNoti, setHoverNoti] = useState(false);
    const [hoverConf, setHoverConf] = useState(false);
    const [hoverRot,setHoverRot]=useState(false);

    const variant=darkMode?'dark':'ligth';
    
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col">
                        <Link to="/perfil">
                            <Image className="imageProfile" fluid src={userProfilePicture} roundedCircle />
                        </Link>
                    </div>
                </div>
                <div className="row my-4 px-4 options">
                    <Link to='/crear-publicacion' className="no-decoration text-black">
                        <div className="col p-3 ps-3 rounded-pill addPost">
                            <FontAwesomeIcon icon={faCirclePlus} size="lg" className="tag" />
                            <p className="m-0 ms-2 d-inline tag">Publicar</p>
                        </div>
                    </Link>
                </div>
                <div className="row mt-3 row-cols-1 g-3 p-3 pt-0 iconos">
                    <div className="col">
                        <Link to="/home" className="no-decoration">
                            <div className="options" onMouseEnter={() => setHoverInicio(true)} onMouseLeave={() => setHoverInicio(false)}>
                                {hoverInicio ? <FontAwesomeIcon icon={faHouse} bounce className="tag" /> : <FontAwesomeIcon icon={faHouse} className="tag" />}
                                <p className="d-inline ms-2 tag">Inicio</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/categorias" className="no-decoration">
                            <div className="options" onMouseEnter={() => setHoverCat(true)} onMouseLeave={() => setHoverCat(false)}>
                                {hoverCat ? <FontAwesomeIcon icon={faBars} flip className="tag" /> : <FontAwesomeIcon icon={faBars} className="tag" />}
                                <p className="d-inline ms-2 tag">Categorías</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/notificaciones" className="no-decoration">
                            <div className="options" onMouseEnter={() => setHoverNoti(true)} onMouseLeave={() => setHoverNoti(false)}>
                                {hoverNoti ? <FontAwesomeIcon icon={faBell} shake className="tag" /> : <FontAwesomeIcon icon={faBell} className="tag" />}
                                <p className="d-inline ms-2 tag">Notificaciones</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/configuracion" className="no-decoration">
                            <div className="options" onMouseEnter={() => setHoverConf(true)} onMouseLeave={() => setHoverConf(false)}>
                                {hoverConf ? <FontAwesomeIcon icon={faGear} spin className="tag" /> : <FontAwesomeIcon icon={faGear} className="tag" />}
                                <p className="d-inline ms-2 tag">Configuración</p>
                            </div>
                        </Link>
                    </div>

                    <div className="row row-cols-1 position-absolute start-0 bottom-0 asideFoot py-3">
                        <div className="col text-center mb-2">
                            <Button variant={variant} onClick={getPosts} onMouseEnter={() => setHoverRot(true)} onMouseLeave={() => setHoverRot(false)} className="bg-transparent border-0">
                                {hoverRot ? <FontAwesomeIcon icon={faRotateRight} size={"lg"} spin/> : <FontAwesomeIcon icon={faRotateRight} size={"lg"}/>}
                            </Button>
                        </div>
                        <div className="col text-center">
                            <FontAwesomeIcon icon={faSun} size="lg" />
                            <Form.Check // prettier-ignore
                                type="switch"
                                className="d-inline mx-3"
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <FontAwesomeIcon icon={faMoon} size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AsideDesktop