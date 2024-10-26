import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CK from "./CkEditor/CK"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const MakePublication=({dark})=>{
    const [data,setData]=useState('');

    function createPost(e){
        // console.log(CKEditor.getData());
        e.preventDefault();
        alert(data);

        
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