import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CK from "./CkEditor/CK"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { API_URL } from "../assets/auth/constants";
import { useAuth } from "../assets/auth/AuthProvider";

const MakePublication=({dark})=>{
    const [data,setData]=useState('');
    const auth=useAuth();
    const [respuesta,setRespuesta]=useState(null);

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

            setRespuesta(result.body.message);
            setData('');

            setTimeout(()=>{
                setRespuesta('');
            },2000);
            
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
                        {respuesta ? <Alert variant="success">{respuesta}</Alert> : ''}
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