const { jsonResponse } = require('../lib/jsonResponse');
const router=require('express').Router();
const db=require('../lib/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

router.post("/",(req,res)=>{
    const {mail,password} =req.body;

    if(!mail || !password){
        return res.status(400).json(jsonResponse(400,{
            error : "Los campos son obligatorios"
        }));
    }

    //Verificación de que el usuario exisa en la base de datos
    const query=`SELECT * FROM User WHERE mail = ?`;
    db.query(query,[mail],async (err,results)=>{
        if(err){
            console.error('Error en la verificación: '+err.message);
            return res.status(500).json(jsonResponse(500,{
                error:"Error en el proceso de verificación"
            }));
        }

        /**
         * Si el resultado de la consulta da 0
         * significa que no se encontró el correo
         * indicado, y por lo tanto, el usuario
         * no existe
         */
        if(results.length===0){
            return res.status(400).json(jsonResponse(400,{
                error:"El correo ingresado no está asociado a ningún usuario existente"
            }));
        }

        /*
        * En caso de que el correo ingresado exista realmente
        entonces significa que el usuario ya está registrado,
        por lo que, esta variable contendrá los atributos del
        usuario registrado
        */
        const user=results[0];

        //Comparación de la contraseña 
        const validPassword=await bcrypt.compare(password,user.password);

        //Si la comparación sale mal, entonces la contraseña es incorrecta
        if(!validPassword){
            return res.status(400).json(jsonResponse(400,{
                error:"La contraseña introducida no es correcta"
            }));
        }

        //Generación de tokens web
        const accesToken=jwt.sign({
            id:user.id,
            name:user.name,
            lastName:user.lastName
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});

        const refreshToken=jwt.sign({
            id:user.id
        },process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});

        //Login exitoso
        res.status(200).json(jsonResponse(200,{
            user:{
                id:user.id,
                name:user.name,
                lastName:user.lastName
            },
            accesToken,
            refreshToken
        }));
    });
});

module.exports=router;  