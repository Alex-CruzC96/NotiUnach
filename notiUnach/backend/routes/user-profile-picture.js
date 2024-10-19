const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const db = require('../lib/db');

router.get('/:userId', async (req, res) => {
    const userId=req.params.userId;

    try{
        const query=`SELECT multimedia.archive_path FROM user_profile_picture 
                    JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id 
                    WHERE user_profile_picture.user_id = ? AND user_profile_picture.is_using = TRUE`;
        
        const response=await db.query(query,[userId]);

        if(response.length > 0){
            return res.status(200).json(jsonResponse(200,{
                profilePicture:response[0].archive_path
            }));
        }
        else{
            return res.status(404).json(jsonResponse(404,{
                message:"El usuario no tiene registrado ninguna foto de perfil"
            }));
        }
    }catch(error){
        console.error("Ha ocurrido un error inesperado: "+error);
        return res.status(500).json(jsonResponse(500,{
            error:"Ha ocurrido un error inesperado"
        }));
    }
});

module.exports = router;