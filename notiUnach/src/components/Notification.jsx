import Container from "react-bootstrap/esm/Container";
import ImgProfile from "./ImgProfile";
import Image from "react-bootstrap/esm/Image";
import './Notification.css'

const Notification=({user,name,date})=>{
    return (
        <>
            <Container fluid className="notification p-2">
                <div className="row text-start">
                    <div className="col">
                        <div className="img">
                            <Image className="img-user" fluid src={ImgProfile+user} roundedCircle/>
                        </div>
                        <div className="d-inline-block ps-2">
                            <p className="fs-5 m-0">asdasdads</p>
                            <p className="date fs-6 m-0">adasds</p>
                            <p className="fs-6 m-0">Le gustó tu contenido</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Notification;