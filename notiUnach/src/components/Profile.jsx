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
import { API_URL } from "../assets/auth/constants";

const Profile = () => {
    //Almacena todo el contenido de usuario
    const {user}=useAuth();

    const userProfilePicture = user?.profilePicture && !user.profilePicture.error 
    ? `../../backend/${user.profilePicture}` 
    : `${ImgProfile}google/unavatar.io`;

    //Variable que se ocupa de almacenar el nombre del usuario para poder cambiarlo luego
    const [nameValue, setNameValue] = useState(user.name+' '+user.lastName);

    //Arreglo que contendrá todo el contenido de los posts seleccionados
    const [posts,setPosts]=useState([]);

    //Función que activa el ícono de lápiz para poder editar el nombre
    function nameHover() {
        const pen = document.querySelector('#pen');
        pen.classList.remove('d-none');
    }

    //Función que desactiva el ícono del lápiz 
    function leaveHover() {
        pen.classList.add('d-none');
    }

    //Función que realizará el fetch para obtener los posts
    async function getPosts() {
        try{
            const response=await fetch(`${API_URL}/getYourPosts/${user.id}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json'
                }
            });

            const result=await response.json();

            if(response.ok){
                setPosts(result.body.posts);
            }
            else{
                console.error("Ocurrió un error: ",error);
            }
        }
        catch(error){
            console.error("Ha ocurrido un error en la comunicación con la API");
        }
    }

    async function getLikedPosts() {
        try{

            const response=await fetch(`${API_URL}/getLikedPosts/${user.id}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json'
                }
            });

            const result=await response.json();

            if(response.ok){
                setPosts(result.body.posts);
            }
            else{
                console.error("Ocurrio un error: ",error);
            }

        }
        catch(error){
            console.error("Ha ocurrido un error en la consulta");
        }
    }

    useEffect(()=>{
        getPosts();
    },[]);

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
                        <div className="p-1 px-sm-3 py-3 optionsProfile" onClick={getPosts}>Tus publicaciones</div>
                        <div className="p-1 px-sm-3 py-3 optionsProfile" onClick={getLikedPosts}>Me gusta</div>
                    </Stack>
                </div>

                {/* En este apartado se renderizarán los post que se soliciten */}
                <div id="profilePost" className="mt-5 mb-5 pb-3">
                    {posts.map((post,index)=>(
                        <Post key={index} postId={post.id} name={`${post.name} ${post.lastName}`} date={post.date} content={post.body} source={post.profile_picture}/>
                    ))}
                </div>
            </Container>
        </>
    );
}

export default Profile