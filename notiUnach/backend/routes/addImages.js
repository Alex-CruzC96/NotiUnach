const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const mysql = require('mysql2/promise'); 
const multer = require('multer');
const path = require('path');
const storagePath = require('../lib/imagePath');
const fs = require('fs');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath);
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,name+'-'+file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if(!allowedTypes.includes(file.mimetype)){
        const error=new Error('Formato de archivo no permitido');
        error.status = 400;
        return cb(error, false);
    }
    cb(null,true);
};

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

router.post('/',upload.single('upload'),async(req,res)=>{
    const fileName=req.file.filename;
    const filePath = req.file.path;
    const relativePath = path.join('localstorage/images', fileName);
    const fileExtension=path.extname(req.file.originalname).slice(1);

    try{
        const [result]=await db.query(
            'INSERT INTO multimedia (archive_type,archive_size,archive_path) VALUES(?,?,?)',
            [fileExtension,req.file.size,relativePath]
        );

        const multimediaId=result.insertId;
        
        if(!multimediaId){
            console.error("No se pudo realizar la inserción a la base de datos");
            return res.status(500).json(jsonResponse(500,{
                error:"Error al intentar insertar la imagen en la base de datos"
            }));
        }

        // const fileUrl=`/uploads/${fileName}`;
        
        return res.status(201).json({
            url:`http://192.168.0.138:5000/uploads/${fileName}`
        });

    }catch(error){
        console.error('Error al subir la imagen (estoy en la línea 53 de la API): ',error);
        return res.status(500).json(jsonResponse(500,{
            error:"Error al subir la imagen"
        }));
    }
});

module.exports = router;