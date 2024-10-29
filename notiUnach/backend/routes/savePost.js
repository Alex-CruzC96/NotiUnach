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

router.post('/',async(req,res)=>{
    const { userId, postId }=req.body;

    if(!userId || !postId){
        return res.status(400).json(jsonResponse(400,{
            message:"Hacen falta parámetros"
        }));
    }
    
    try{

        //Se verifica si se está guardando el post o se está eliminando
        const [rows]=await db.query(`
            SELECT * FROM saved_post WHERE user_id = ? AND post_id = ?    
        `,[userId,postId]);

        //Si esto se cumple entonces el post ya está guardado
        if(rows.length > 0){
            await db.query('DELETE FROM saved_post WHERE user_id = ? AND post_id = ?',[userId,postId]);
        }
        else{
            const date=new Date().toISOString().slice(0,19).replace('T',' ');
            //Hacemos la inserción a la base de datos
            await db.query(`
                INSERT INTO saved_post(user_id,post_id,date)
                VALUES(?,?,?)
            `,[userId,postId,date]);

            //Obtener el id del creador del post
            const [postRows]=await db.query('SELECT user_id FROM post WHERE id=?',[postId]);
            const postOwner=postRows[0].user_id;

            //Nombre de quien da like
            const [userRows]=await db.query('SELECT name, lastName FROM user WHERE id = ?',[userId]);
            const userName=userRows[0].name+' '+userRows[0].lastName;

            if(userId !== postOwner){
                const message=`${userName} ha guardado tu post`;

                await db.query(`
                    INSERT INTO notifications (user_sends,user_receives,post_id,message,date)
                    VALUES (?,?,?,?,?)
                `,[userId,postOwner,postId,message,date]);
            }
        }
        
        return res.status(200).json(jsonResponse(200,{
            message:"Acción completada"
        }));
    }
    catch(error){
        console.error("Ha ocurrido un problema: ",error);
        return res.status(500).json(jsonResponse(500,{
            error:"Ocurrió un error inesperado"
        }));
    }
});

module.exports=router;