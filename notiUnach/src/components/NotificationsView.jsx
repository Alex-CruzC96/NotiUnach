import Container from "react-bootstrap/esm/Container";
import Notification from "./Notification";
import './NotificationView.css'
import { useState, useEffect } from "react";
import {API_URL} from '../assets/auth/constants'
import {useAuth} from '../assets/auth/AuthProvider'


const NotificationsView=()=>{
    const { user } =useAuth();
    const [notifications,setNotifications]=useState([]);

    const fetchNotifications=async()=>{
        try{
            const response=await fetch(`${API_URL}/getNotifications/${user.id}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json'
                }
            });

            const result=await response.json();

            if(response.ok){
                setNotifications(result.body.notifications);
            }
        }
        catch(error){
            console.error("Ha ocurrido un error con la comunicación de la API");
        }
    }

    useEffect(()=>{
        fetchNotifications();
    },[]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <Container fluid className="text-center pt-4">
                <p className="fs-2">Notificaciones</p>

                <div id="notificaciones">
                    {notifications.map((notification,index)=>(
                        <Notification 
                        key={index} 
                        name={notification.sender_name+' '+notification.sender_lastName} 
                        message={notification.message} 
                        url={notification.profile_picture}
                        date={formatDate(notification.date)}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default NotificationsView;