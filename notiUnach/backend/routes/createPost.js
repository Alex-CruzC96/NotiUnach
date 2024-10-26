const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const mysql = require('mysql2/promise'); 
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

router.post('/', async (req,res)=>{
    const { userId, body }=req.body;

    if(!userId || !body){
        return res.status(400).json(jsonResponse(400,{
            error:"Los campos no pueden estar vacíos"
        }));
    }

    const date=new Date().toISOString().slice(0,19).replace('T',' ');

    try{
        const [result]=await db.query(
            'INSERT INTO post (body,date,user_id) VALUES (?,?,?)',
            [body,date,userId]
        );

        const postId=result.insertId;

        if(!postId){
            return res.status(500).json(jsonResponse(500,{
                error:"Error al insertar el post en la base de datos"
            }));
        }

        return res.status(201).json(jsonResponse(201,{
            message:"Post publicado con éxito",
            postId:postId
        }));

    }
    catch(error){
        console.error('Ha ocurrido un error al intentar realizar la publicación');
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error al intentar publicar el post"
        }));
    }
});

module.exports=router;