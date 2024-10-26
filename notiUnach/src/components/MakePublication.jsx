import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CK from "./CkEditor/CK"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { API_URL } from "../assets/auth/constants";
import { useAuth } from "../assets/auth/AuthProvider";

const MakePublication=({dark})=>{
    const [data,setData]=useState('');
    const auth=useAuth();

    async function createPost(e){
        // console.log(CKEditor.getData());
        e.preventDefault();
        
        try{
            const response=await fetch(`${API_URL}/createPost`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${auth.getAccessToken()}`
                },
                body:JSON.stringify({
                    userId:auth.user.id,
                    body:data
                })
            });

            const result=await response.json();

            if(!response.ok){
                alert('Error al crear el post');
                return;
            }

            alert('Publicación creada con éxito!!!');
        }
        catch(error){
            console.error('Ha ocurrido un error al contactar con la API: ',error);
            alert("Error al crear el post");
        }

    }

    return(
        <>
            <Container fluid className="pt-4">
                <Row>
                    <Col>
                        <h2>Crear publicación</h2>
                    </Col>
                </Row>
                <Row className="pt-5">
                    <Col>
                        <CK data={data} setData={setData}/>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col>
                        <Form>
                            <Button type="submit" variant="primary" onClick={(e)=>createPost(e)}>Publicar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MakePublication;