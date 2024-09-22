import Image from "react-bootstrap/esm/Image"
import ImgProfile from "./ImgProfile"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import './Profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faP, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Profile=({user , name})=>{

    const[nameValue,setNameValue]=useState(name);
    
    function nameHover(){
        const pen=document.querySelector('#pen');
        pen.classList.remove('d-none');
    }

    function leaveHover(){
        pen.classList.add('d-none');
    }

    function startEdit(){
        const nameNow=document.getElementById('name');
        const changeName=document.getElementById('changeName');
        if(nameNow.classList.contains('d-none')){
            nameNow.classList.remove('d-none');
            changeName.classList.add('d-none');
        }
        else{
            nameNow.classList.add('d-none');
            changeName.classList.remove('d-none');
        }
    }

    return (
        <>
            <Container fluid>
                <Row className="text-center mt-5">
                    <Col>
                        <Image id="profileImage" fluid roundedCircle src={ImgProfile+user}/>
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <span onMouseEnter={nameHover} onMouseLeave={leaveHover} className="p-2 position-relative">
                            <p id="name" className="fs-3 d-inline">{name}</p>

                            <input onChange={(input)=>setNameValue(input.target.value)} 
                            value={nameValue} id="changeName" type="text" 
                            className="d-none bg-transparent border-0 border-bottom fs-4"/>

                            <Button onClick={startEdit} id="pen" className="position-absolute d-none bg-transparent border-0 p-0 ps-2">
                                <FontAwesomeIcon icon={faPen} size="xs" className="tag" color="#000000"/>
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile