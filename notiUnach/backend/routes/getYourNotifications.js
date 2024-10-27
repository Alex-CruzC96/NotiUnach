const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()
const mysql=require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

router.get('/:userId',async (req,res)=>{
    const { userId }=req.params;

    if(!userId){
        return res.status(400).json(jsonResponse(400,{
            error:"Hace falta un parámetro"
        }));
    }
    
    try{
        const [rows]=await db.query(`
            SELECT 
            notifications.id,
            notifications.post_id,
            notifications.message,
            notifications.date,
            sender.name AS sender_name,
            sender.lastName AS sender_lastName,
            multimedia.archive_path AS profile_picture
            FROM notifications
            JOIN user AS sender ON notifications.user_sends = sender.id
            LEFT JOIN user_profile_picture ON sender.id = user_profile_picture.user_id 
            AND user_profile_picture.is_using = TRUE
            LEFT JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id
            WHERE notifications.user_receives = ?
            ORDER BY notifications.date DESC, notifications.id
        `,[userId]);

        if(rows.length===0){
            return res.status(404).json(jsonResponse(404,{
                message:"El usuario aún no tiene notificaciones"
            }));
        }

        return res.status(200).json(jsonResponse(200,{
            notifications:rows
        }));

    }catch(error){
        console.error('Ha ocurrido un error en la consulta');
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error en la consulta"
        }));
    }
});

module.exports=router;