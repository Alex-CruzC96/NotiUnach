const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()
require('dotenv').config();

const db = require('../lib/db');


router.get('/:userId/:postId', async (req,res)=>{

    const { userId, postId }=req.params;

    if(!userId || !postId){
        return res.status(400).json(jsonResponse(400,{
            error:"Hacen falta campos por llenar"
        }));
    }

    try{

        const [rows] = await db.query('SELECT 1 FROM liked_post WHERE user_id = ? AND post_id = ?',[userId,postId]);

        const isLiked=rows.length > 0;

        return res.status(200).json(jsonResponse(200,{
            isLiked:isLiked
        }));

    }
    catch(error){
        console.error('Error al verificar el like: ',error);
        return res.status(500).json(jsonResponse(500,{
            error:"Error al verificar si el post tiene like"
        }));
    }
});

module.exports=router;