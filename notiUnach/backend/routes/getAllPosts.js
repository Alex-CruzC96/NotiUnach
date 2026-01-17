const { jsonResponse }=require('../lib/jsonResponse');
const router=require('express').Router()

const db = require('../lib/db');


router.get('/',async (req,res)=>{

    try{

        const result = await db.query(
            `SELECT p.*, u.name, u.last_name, m.archive_path AS profile_picture
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN user_profile_picture upp ON u.id = upp.user_id 
            AND upp.is_using = TRUE
            LEFT JOIN multimedia m ON upp.multimedia_id = m.id
            ORDER BY p.created_at DESC, p.id DESC
            `
        );

        const rows = result.rows;

        if(rows.length === 0){
            return res.status(404).json({
                message:"Aún no se ha realizado ninguna publicación"
            });
        }
        
        return res.status(200).json({
            posts:rows
        })
        
    }
    catch(error){
        //console.error('Ha ocurrido un error en la consulta');
        return res.status(500).json({
            message:"Ocurrió un problema con la consulta",
            error
        });
    }
});

module.exports=router;
