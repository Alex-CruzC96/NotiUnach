import Container from "react-bootstrap/esm/Container";
import Notification from "./Notification";
import './NotificationView.css'


const NotificationsView=()=>{

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Notificaciones</p>

                <div id="notificaciones">
                    <Notification user={'youtube/davie504'} name={'Davie504'} date={'30-09-2024'}/>
                    <Notification user={'youtube/clavero'} name={'Clavero'} date={'30-09-2024'}/>
                    <Notification user={'youtube/vintagebursche'} name={'Niklas'} date={'30-09-2024'}/>
                    <Notification user={'youtube/victorabarca'} name={'Victor Abarca'} date={'30-09-2024'}/>
                    <Notification user={'youtube/portillo'} name={'Portillo'} date={'30-09-2024'}/>
                </div>
            </Container>
        </>
    );
}

export default NotificationsView;