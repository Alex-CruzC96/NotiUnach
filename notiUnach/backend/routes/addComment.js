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

router.post('/',async (req,res)=>{
    const {postId, userId, content}=req.body;

    if(!postId || !userId || !content){
        return res.status(400).json(jsonResponse(400,{
            message:"hacen falta datos necesarios"
        }));
    }

    try{

        const date=new Date().toISOString().slice(0,19).replace('T',' ');

        await db.query(`
          INSERT INTO comments (post_id,user_id,content,date)
          VALUES(?,?,?,?)  
        `,[postId,userId,content,date]);

        return res.status(200).json(jsonResponse(200,{
            message:"Comentario publicado con éxito"
        }));

    }
    catch(error){
        console.error('Error al agregar el comentario: ',error);
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error"
        }));
    }
});

module.exports=router;