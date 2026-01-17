const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()
require('dotenv').config();

const db = require('../lib/db');

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

        //Obtener el id del creador del post
        const [postRows]=await db.query('SELECT user_id FROM post WHERE id=?',[postId]);
        const postOwner=postRows[0].user_id;

        //Nombre de quien da like
        const [userRows]=await db.query('SELECT name, lastName FROM user WHERE id = ?',[userId]);
        const userName=userRows[0].name+' '+userRows[0].lastName;

        if(userId !== postOwner){
            const message=`${userName} ha comentado tu post`;

            await db.query(`
                INSERT INTO notifications (user_sends,user_receives,post_id,message,date)
                VALUES (?,?,?,?,?)
            `,[userId,postOwner,postId,message,date]);
        }

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