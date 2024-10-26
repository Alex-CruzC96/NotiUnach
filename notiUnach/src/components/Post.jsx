import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image'
import ImgProfile from './ImgProfile'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import './Post.css'

function Post({source,name,date,content}){
    //Esta variable debe estar en función de una API
    const [like,setLike]=useState(false);
    const [savePost,setSavePost]=useState(false);

    //Clase que controla el color del corazon y del bookMark de cada POST
    let classHeart=like ? 'liked' : '';
    let bookMarkClass=savePost? 'saved' : '';

    const url=`../../backend/${source}`;

    const likePost=()=>{
        setLike(!like);
        //Mandar a llamar a la API para dar LIKE
    }

    const save=()=>{
        setSavePost(!savePost);
        //Mandar a llamar a la API para guardar POST
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
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        <Button className='bg-transparent border-0 p-0' onClick={()=>likePost()}>
                            <FontAwesomeIcon icon={faHeart} size='lg' className={'corazon '+classHeart}/>
                        </Button>{''}
                        <Button className='bg-transparent border-0 p-0 ms-2'>
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