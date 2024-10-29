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

router.get('/:userId/:postId',async(req,res)=>{
    const { userId, postId }=req.params;

    if(!userId || !postId){
        return res.status(400).json(jsonResponse(400,{
            message:"Hacen falta parámetros"
        }));
    }

    try{
        

    }
    catch(error){
        console.error("Ha ocurrido un error en la consulta");
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error en la consulta"
        }));
    }
});

module.exports=router;