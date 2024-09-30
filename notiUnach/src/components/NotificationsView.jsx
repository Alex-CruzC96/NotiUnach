import Container from "react-bootstrap/esm/Container";
import Notification from "./Notification";


const NotificationsView=()=>{

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Notificaciones</p>

                <div className="row row-cols-1">
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                    <div className="col my-2">
                        <Notification/>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default NotificationsView;