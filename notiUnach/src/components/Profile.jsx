import Image from "react-bootstrap/esm/Image"
import ImgProfile from "./ImgProfile"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Stack from 'react-bootstrap/Stack';
import './Profile.css'
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../assets/auth/AuthProvider";

const Profile = () => {
    //Almacena todo el contenido de usuario
    const {user}=useAuth();

    const userProfilePicture = user?.profilePicture && !user.profilePicture.error 
    ? `../../backend/${user.profilePicture}` 
    : `${ImgProfile}google/unavatar.io`;

    //Variable que se ocupa de almacenar el nombre del usuario para poder cambiarlo luego
    const [nameValue, setNameValue] = useState(user.name+' '+user.lastName);

    //Función que activa el ícono de lápiz para poder editar el nombre
    function nameHover() {
        const pen = document.querySelector('#pen');
        pen.classList.remove('d-none');
    }

    //Función que desactiva el ícono del lápiz 
    function leaveHover() {
        pen.classList.add('d-none');
    }

    //Función que se ejecuta al clickear el lápiz
    /*
        Funciona de modo que oculta el parrafo
        del nombre y activa el input y al volver
        a dar click hace lo contrario
    */
    function startEdit() {
        const nameNow = document.getElementById('name');
        const changeName = document.getElementById('changeName');
        if (nameNow.classList.contains('d-none')) {
            nameNow.classList.remove('d-none');
            changeName.classList.add('d-none');
        }
        else {
            nameNow.classList.add('d-none');
            changeName.classList.remove('d-none');
        }
    }

    return (
        <>
            <Container fluid>
                <Row className="text-center mt-5">
                    <Col>
                        <Image id="profileImage" fluid roundedCircle src={userProfilePicture} />
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <span onMouseEnter={nameHover} onMouseLeave={leaveHover} className="p-2 position-relative">
                            <p id="name" className="fs-3 d-inline">{user.name+' '+user.lastName}</p>

                            <input onChange={(input) => setNameValue(input.target.value)}
                                value={nameValue} id="changeName" type="text"
                                className="d-none bg-transparent border-0 border-bottom fs-4" />

                            <Button onClick={startEdit} id="pen" className="position-absolute d-none bg-transparent border-0 p-0 ps-2">
                                <FontAwesomeIcon icon={faPen} size="xs" className="tag" color="#000000" />
                            </Button>
                        </span>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-3">
                    <Stack direction="horizontal" gap={{ 'lg': 5, 'sm': 4, 'xs': 1 }} className="flex-wrap justify-content-center">
                        <div className="p-1 px-sm-3 py-3 optionsProfile">Publicaciones guardadas</div>
                        <div className="p-1 px-sm-3 py-3 optionsProfile">Tus publicaciones</div>
                        <div className="p-1 px-sm-3 py-3 optionsProfile">Me gusta</div>
                    </Stack>
                </div>

                {/* En este apartado se renderizarán los post que se soliciten */}
                <div id="profilePost" className="mt-5 mb-5 pb-3">
                    <Post
                        user={'readcv/elenatorro'}
                        name={'User_03'}
                        date={'12-09-2024'}
                        content={'Mi primer post en la página, ¡Qué emoción!'}
                    />
                    <Post
                        user={'x/midudev'}
                        name={'miDudev'}
                        date={'09-08-2024'}
                        content={'Lorem ipsum dolor sit amet consectetur adipiscing elit, pulvinar mi nec interdum integer taciti. Ridiculus neque posuere nulla sociosqu, rhoncus ac fusce curabitur, conubia eget metus. Metus sagittis arcu molestie enim luctus in praesent auctor, faucibus pellentesque ligula penatibus conubia et tempor risus elementum, dui integer ac habitant blandit pretium tristique. Aliquet quam velit augue sem morbi mauris sagittis iaculis risus pharetra porttitor cras, vel et integer est nulla placerat odio vestibulum montes varius. Natoque faucibus tempus a lobortis conubia ad risus elementum phasellus, mattis scelerisque suscipit porttitor hendrerit arcu parturient interdum, odio montes inceptos ornare neque posuere tempor non. Neque suspendisse curae donec quam facilisi imperdiet eleifend torquent aliquam porta, a sagittis himenaeos vulputate ante bibendum cras ridiculus pulvinar, vitae augue habitant nascetur fringilla diam suscipit enim cum.'}
                    />
                </div>
            </Container>
        </>
    );
}

export default Profile