const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()
require('dotenv').config();

const db = require('../lib/db');


router.get('/:postId',async(req,res)=>{
    const { postId }=req.params;

    if(!postId){
        return res.status(400).json(jsonResponse(400,{
            message:"Hace falta un dato"
        }));
    }

    try{
        const [rows]=await db.query(`
            SELECT
            comments.content,
            comments.date,
            user.name,
            user.lastName,
            multimedia.archive_path AS profile_picture
            FROM comments
            JOIN user ON comments.user_id = user.id
            LEFT JOIN user_profile_picture ON user.id = user_profile_picture.user_id
            AND user_profile_picture.is_using = TRUE
            LEFT JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id
            WHERE comments.post_id = ?
            ORDER BY comments.date DESC, comments.id DESC  
        `,[postId]);

        if(rows.length===0){
            return res.status(404).json(jsonResponse(404,{
                message:"Este post no contiene comentarios"
            }));
        }

        return res.status(200).json(jsonResponse(200,{
            comments:rows
        }));
    }
    catch(error){
        console.error('Ha ocurrido un error en la consulta: ',error);
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error en la comunicación"
        }));
    }

});

module.exports=router;