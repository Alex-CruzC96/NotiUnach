const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()
require('dotenv').config();

const db = require('../lib/db');


router.get('/',async (req,res)=>{

    try{

        const [rows]=await db.query(
            `SELECT post.*, user.name, user.lastName, multimedia.archive_path AS profile_picture
            FROM post
            JOIN user ON post.user_id = user.id
            LEFT JOIN user_profile_picture ON user.id = user_profile_picture.user_id 
            AND user_profile_picture.is_using = TRUE
            LEFT JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id
            ORDER BY post.date DESC, post.id DESC
            `
        );

        if(rows.length === 0){
            return res.status(404).json(jsonResponse(404,{
                message:"Aún no se ha realizado ninguna publicación"
            }));
        }

        return res.status(200).json(jsonResponse(200,{
            posts:rows
        }));
        
    }
    catch(error){
        console.error('Ha ocurrido un error en la consulta');
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un problema con la consulta"
        }));
    }
});

module.exports=router;
