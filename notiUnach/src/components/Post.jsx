import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image'
import Button from 'react-bootstrap/Button';
import ImgProfile from './ImgProfile';
import Comment from './Comment';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faL } from '@fortawesome/free-solid-svg-icons'
import { faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './Post.css'
import './CkEditor/ImgStyles.css'
import { useAuth } from '../assets/auth/AuthProvider'
import { API_URL } from '../assets/auth/constants'
import CK from './CkEditor/CK';

function Post({postId,source,name,date,content,darkMode}){
    //Contenido del usuario que tiene una sesión iniciada 
    const { user }=useAuth();

    //Esta variable debe estar en función de una API
    const [like,setLike]=useState(false);
    const [savePost,setSavePost]=useState(false);
    
    //Variable para mostrar comentarios
    const [showComents,setShowComments]=useState(false);

    //Variable con el contenido del comentario por hacer
    const [data,setData]=useState('');

    //Clase que controla el color del corazon y del bookMark de cada POST
    let classHeart=like ? 'liked' : '';
    let bookMarkClass=savePost? 'saved' : '';

    let commentsActive=showComents ? 'active' : '';

    const url=source ? `../../backend/${source}` : `${ImgProfile}google/unavatar.io`;

    useEffect(()=>{
        const fetchLikeStatus = async () =>{
            try{

                const response=await fetch(`${API_URL}/isLiked/${user.id}/${postId}`,{
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                    }
                });

                const result = await response.json();
                if(response.ok){
                    setLike(result.body.isLiked);
                }
                else{
                    console.error("Error al verificar si el post te gusta");
                }
            }
            catch(error){
                console.error('Ha ocurrido un error con la comunicación');
            }
        };

        const fetchSaveStatus=async()=>{
            try{
                const response=await fetch(`${API_URL}/isSaved/${user.id}/${postId}`,{
                    method:'GET',
                    headers:{
                        'Content-type':'application/json'
                    }
                });

                const result=await response.json();

                if(response.ok){
                    setSavePost(result.body.isSaved);
                }
                else{
                    console.error('Error al verifiar si el post está almacenado');
                }
            }
            catch(error){
                console.error("Ocurrió un error en la comunicación: ",error);
            }
        }

        fetchLikeStatus();
        fetchSaveStatus();
    },[user.id,postId]);

    const likePost=async ()=>{
        //Mandar a llamar a la API para dar LIKE
        try{
            const response=await fetch(`${API_URL}/likePost`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userId:user.id,
                    postId
                })
            });

            if(response.ok){
                setLike(!like);
            }
            else{
                console.error("Error al dar like al post");
            }
        }
        catch(error){
            console.error("Ocurrió un problema al dar like");
        }

    }

    const save=async()=>{
        try{
            const response=await fetch(`${API_URL}/savePost`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    userId:user.id,
                    postId
                })
            });

            if(response.ok){
                setSavePost(!savePost);
            }
            else{
                console.error("Error al guardar el post");
            }
        }
        catch(error){
            console.error("Ocurre un problema al tratar de guardar el post: ",error);
        }
    }

    const shareComment=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${API_URL}/commentPost`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    postId:postId,
                    userId:user.id,
                    content:data
                })
            });

            if(response.ok){
                alert("Comentario publicado con éxito");
                setData('');
            }else{
                console.error('Ocurrió un error inesperado:');
            }
        }
        catch(error){
            console.error("Ocurrió un error de excepción: ",error);
        }

    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return(
        <>
            <Container fluid className='post p-2'>
                <Row>
                    <Col>
                        <div className="img">
                            <Image className='img-user' fluid src={url} roundedCircle/>
                        </div>
                        <div className='d-inline-block ps-2'>
                            <p className="fs-5 m-0">{name}</p>
                            <p className="date fs-6 m-0">{formatDate(date)}</p>
                        </div>
                    </Col>
                </Row>
                <Row className='px-1'>
                    <Col>
                        <div className="ck-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        <div className={'comments '+commentsActive}>
                            <div className='commentsSection'>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                                <Comment name={'Alex'} lastName={'Cruz'} date={'31-10-2024'}/>
                            </div>
                            <div className={'editorSection '+darkMode}>
                                <Row className='row-cols-2'>
                                    <Col xs={10} className='max-height'>
                                        <CK placeholder={'Escribe un comentario'} data={data} setData={setData}/>
                                    </Col>
                                    <Col xs={2} className='d-flex justify-content-center align-items-end'>
                                        <Form onSubmit={shareComment}>
                                            <Button type='submit'>
                                                <FontAwesomeIcon icon={faPaperPlane}/>
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Button className='bg-transparent border-0 p-0' onClick={()=>likePost()}>
                            <FontAwesomeIcon icon={faHeart} size='lg' className={'corazon '+classHeart}/>
                        </Button>{''}
                        <Button className='bg-transparent border-0 p-0 ms-2' onClick={()=>setShowComments(!showComents)}>
                            <FontAwesomeIcon icon={faComment} size='lg' className='comentario'/>
                        </Button>
                        <Button className='bg-transparent border-0 p-0 ms-2' onClick={() => save()}>
                            <FontAwesomeIcon icon={faBookmark} size='lg' className={'saveIcon '+bookMarkClass}/>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default Post;    