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
    const { userId, postId }=req.body;

    if(!userId || !postId){
        return res.status(400).json(jsonResponse(400,{
            error:"Hacen falta datos"
        }));
    }

    try{
        //Debemos verificar si se está dando like o quitandolo
        const [rows]=await db.query('SELECT * FROM liked_post WHERE user_id = ? AND post_id = ?',[userId,postId]);

        if(rows.length > 0){
            //Se elimina el registro para indicar que se quitó el like
            await db.query('DELETE FROM liked_post WHERE user_id = ? AND post_id = ?',[userId,postId]);
        }
        else{
            //Se hace la inserción para indicar que te gusta un post
            await db.query(`
                INSERT INTO liked_post (user_id,post_id)
                VALUES (?,?)    
            `,[userId,postId]);
        }

        return res.status(200).json(jsonResponse(200,{
            message:"Acción completada"
        }));

    }
    catch(error){
        console.error('Ha ocurrido un error en la inserción');
        return res.status(500).json(jsonResponse(500,{
            error:"Ha ocurrido un problema en la inserción"
        }));
    }
});

module.exports=router;