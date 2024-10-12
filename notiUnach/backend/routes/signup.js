const { jsonResponse } = require('../lib/jsonResponse');

const router=require('express').Router();

router.post("/",(req,res)=>{
    const {name,mail,password} =req.body;

    if(!!name || !!mail || !!password){
        return res.status(400).json(jsonResponse(400,{
            error : "Los campos son obligatorios"
        }));
    }

    //Creación de usuario
    res.status(200).json(jsonResponse(200,{
        message:"Usuario creado con éxito!!"
    }))
    res.send("SignUp");
});

module.exports=router;  