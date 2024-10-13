const { jsonResponse } = require('../lib/jsonResponse');

const router=require('express').Router();

router.post("/",(req,res)=>{
    const {mail,password} =req.body;

    if(!mail || !password){
        return res.status(400).json(jsonResponse(400,{
            error : "Los campos son obligatorios"
        }));
    }

    //Autenticarlo
    const accesToken="acces_token";
    const refreshToken="refres_token";
    const user={
        id:'1',
        name:'Alex',
        lastName:'Cruz'
    }

    res.status(200).json(jsonResponse(200,{
        user,
        accesToken,
        refreshToken
    }));
    
});

module.exports=router;  