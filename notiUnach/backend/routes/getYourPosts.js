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

router.get('/', async (req,res)=>{
    
    const { userId }=req.body;

    try{
        const [rows] = await db.query(`
            SELECT post.*, user.name, user.lastName, multimedia.archive_path AS profile_picture
            FROM post
            JOIN user ON post.user_id = user.id
            LEFT JOIN user_profile_picture ON user.id = user_profile_picture.user_id 
            AND user_profile_picture.is_using = TRUE
            LEFT JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id
            WHERE post.user_id = ?
            ORDER BY post.date DESC, post.id DESC    
        `,[userId]);

        if(rows.length === 0){
            return res.status(404).json(jsonResponse(404,{
                message:"El usuario aún no ha publicado nada"
            }));
        }

        return res.status(200).json(jsonResponse(200,{
            posts:rows
        }));
    }
    catch(error){
        console.error('Ha ocurrido un error con la consulta');
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error con la consulta"
        }));
    }
});

module.exports=router;